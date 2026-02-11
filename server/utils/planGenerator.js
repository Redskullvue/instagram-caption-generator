// server/utils/gemini.js
import OpenAI from "openai";
import { tools, getInstagramData } from "~~/server/utils/tools";
import { buildSystemPrompt, generateStructuredJson } from "./plannerFunction";
import { aiEngines } from "./aiList";
let openaiClient = null;
const config = useRuntimeConfig();
function getOpenAIClient(apiKey, baseURL) {
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: apiKey,
      baseURL: baseURL,
    });
  }

  return openaiClient;
}
export async function generatePlan(
  prompt,
  options = {},
  conversationHistory = [],
  selectedAiEngine,
) {
  let selectedAI = aiEngines.find((engine) => engine.name === selectedAiEngine);
  if (!selectedAI) {
    selectedAI = {
      name: "gemeni",
      model: "google/gemini-2.0-flash-001",
      baseURL: config.geminiBaseUrl,
      apiKey: config.geminiApiKey,
    };
  }
  const {
    tone = "casual",
    socialMedia = "instagram",
    includeEmojis = true,
    includeHashtags = true,
    language = "fa", // Default Persian
    maxLength = 500,
  } = options;

  const systemPrompt = buildSystemPrompt({
    tone,
    socialMedia,
    includeEmojis,
    includeHashtags,
    language,
    maxLength,
  });

  try {
    const client = getOpenAIClient(selectedAI.apiKey, selectedAI.baseURL);

    // In here we get sure that gemeni gets the context of last messages so It can be relateable
    const messages = [
      {
        role: "system",
        content: systemPrompt,
      },
    ];
    if (conversationHistory && conversationHistory.length > 0) {
      conversationHistory.forEach((msg) => {
        messages.push({
          role: msg.isUser ? "user" : "assistant",
          content: msg.text,
        });
      });
    }

    // Add current user message
    messages.push({
      role: "user",
      content: ` ${prompt}`,
    });

    const response = await client.chat.completions.create({
      model: selectedAI.model, // Check Liara docs for exact model name
      messages: messages,
      max_tokens: 1024,
      tools: tools,
      tool_choice: "auto",
    });

    const generatedText = response.choices[0]?.message;

    if (generatedText.tool_calls) {
      console.log("AI USING TOOLS TO PLAN");
      // Clean tool_calls by removing the 'index' field
      const cleanedToolCalls = generatedText.tool_calls.map((tc) => ({
        id: tc.id,
        type: tc.type,
        function: tc.function,
      }));

      // Add the assistant's message with tool_calls to the conversation
      const cleanAssistantMessage = {
        role: generatedText.role,
        content: generatedText.content || "",
        tool_calls: cleanedToolCalls,
      };
      messages.push(cleanAssistantMessage);

      // Select which tool ai is using and what argument it's passing
      const toolCall = generatedText.tool_calls[0];
      const functionArgs = JSON.parse(toolCall.function.arguments);
      const username = functionArgs.username;

      const toolResponse = await getInstagramData(username);
      // Add the tool response to messages with correct format
      messages.push({
        role: "tool",
        content: JSON.stringify(toolResponse),
        tool_call_id: toolCall.id,
      });

      // Get final response after tool execution
      const finalResponse = await client.chat.completions.create({
        model: selectedAI.model,
        messages: messages,
      });

      if (!finalResponse) {
        throw new Error("No Plan Generated");
      }
      const jsonPlan = await generateStructuredJson(
        client,
        finalResponse.choices[0].message.content,
        generatedText.content,
        { tone, socialMedia, includeEmojis, includeHashtags },
      );

      return {
        plan: finalResponse.choices[0].message.content.trim(),
        jsonPlanData: jsonPlan,
        usage: {
          promptTokens:
            (response.usage?.prompt_tokens || 0) +
            (finalResponse.usage?.prompt_tokens || 0),
          completionTokens:
            (response.usage?.completion_tokens || 0) +
            (finalResponse.usage?.completion_tokens || 0),
          totalTokens:
            (response.usage?.total_tokens || 0) +
            (finalResponse.usage?.total_tokens || 0),
        },
      };
    } else {
      // No tool calls - return direct response
      if (!generatedText) {
        throw new Error("No caption generated");
      }
      const jsonPlan = await generateStructuredJson(
        client,
        "",
        generatedText.content,
        { tone, socialMedia, includeEmojis, includeHashtags },
      );
      return {
        plan: generatedText.content.trim(),
        jsonPlanData: jsonPlan,
        usage: {
          promptTokens: response.usage?.prompt_tokens || 0,
          completionTokens: response.usage?.completion_tokens || 0,
          totalTokens: response.usage?.total_tokens || 0,
        },
      };
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error(error.message || "Failed to generate caption");
  }
}
