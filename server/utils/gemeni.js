// server/utils/gemini.js
import OpenAI from "openai";
import { aiEngines } from "./aiList";
import { buildSystemPromptCaption } from "./captionsFunction";

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
export async function generateCaption(
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

  const systemPrompt = buildSystemPromptCaption({
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
      content: `موضوع پست ${prompt}`,
    });

    const response = await client.chat.completions.create({
      model: selectedAI.model, // Check Liara docs for exact model name
      messages: messages,
    });

    const generatedText = response.choices[0]?.message;
    if (generatedText.tool_calls) {
      console.log("AI is trying to use tools");
      const functionResponse = newsForm(prompt);
      messages.push({
        tool_call_id: generatedText.tool_calls[0].id,
        role: "tool",
        name: "newsForm",
        content: JSON.stringify(functionResponse), // Must be a string
      });
      const finalResponse = await client.chat.completions.create({
        model: selectedAI.model,
        messages: messages,
      });
      return {
        caption: finalResponse.choices[0].message.content.trim(),
        usage: {
          promptTokens: response.usage?.prompt_tokens || 0,
          completionTokens: response.usage?.completion_tokens || 0,
          totalTokens: response.usage?.total_tokens || 0,
        },
      };
    } else {
      if (!generatedText) {
        throw new Error("No caption generated");
      }

      return {
        caption: generatedText.content.trim(),
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
