// server/utils/gemini.js
import OpenAI from "openai";
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
export async function generateAnswer(
  prompt,
  conversationHistory = [],
  selectedAiEngine,
  tone,
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

  try {
    const client = getOpenAIClient(selectedAI.apiKey, selectedAI.baseURL);

    // In here we get sure that gemeni gets the context of last messages so It can be relateable
    const messages = [
      {
        role: "system",
        content: `پاسخ رو با این لحن : ${tone} بده`,
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
      content: prompt,
    });

    const response = await client.chat.completions.create({
      model: selectedAI.model, // Check Liara docs for exact model name
      messages: messages,
    });

    const generatedText = response.choices[0]?.message;
    if (generatedText) {
      return {
        caption: generatedText.content.trim(),
        usage: {
          promptTokens: response.usage?.prompt_tokens || 0,
          completionTokens: response.usage?.completion_tokens || 0,
          totalTokens: response.usage?.total_tokens || 0,
        },
      };
    } else {
      throw new Error(error.message || "Something went wrong");
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error(error.message || "Failed to generate caption");
  }
}
