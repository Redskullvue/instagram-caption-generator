// server/utils/imageGenerator.js
import OpenAi from "openai";
import { tools, generateImage } from "~~/server/utils/tools";

let openaiClient = null;

function getOpenAiClient() {
  if (!openaiClient) {
    const config = useRuntimeConfig();
    openaiClient = new OpenAi({
      apiKey: config.geminiApiKey,
      baseURL: config.geminiBaseUrl,
    });
  }
  return openaiClient;
}

export async function imagesGenerator(prompt, conversationHistory = []) {
  try {
    const client = getOpenAiClient();

    const messages = [
      {
        role: "system",
        content: `تو یک دستیار تولید تصویر هستی. وظیفه‌ات این است که:
1. اگر پرامپت کاربر فارسی است، آن را به انگلیسی ترجمه کنی
2. پرامپت انگلیسی را بهینه‌سازی کنی برای تولید تصویر با کیفیت
3. از تابع generate_image استفاده کنی
4. بعد از دریافت لینک تصویر، یک پاسخ کوتاه و دوستانه به فارسی بده
5. درصورت وجود چت های قبلی حتما به کلمات این،آن،خوب و بد توجه کن و پرامپت جدید و بر اساس فیدبک اصلاح کن
6. در پاسخ آخرت نیازی نیست لینک رو بزاری فقط اطلاع آماده شدن تصویر رو بده
7.لازم به توضیح نیست فقط اطلاع آماده شدن تصویر رو بده
مثال پرامپت خوب انگلیسی:
"A serene mountain landscape at sunset, with golden light reflecting on a calm lake, photorealistic, 4k quality"

حتماً جزئیات بصری مثل نور، رنگ، سبک را اضافه کن.`,
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

    messages.push({
      role: "user",
      content: prompt,
    });
    // First AI call - expect tool use
    const response = await client.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: messages,
      max_tokens: 1024,
      temperature: 0.7, // Lower temp for more consistent translation
      tools: tools, // Pass tool definition
      tool_choice: "required",
    });

    const generatedText = response.choices[0]?.message;

    if (!generatedText) {
      throw new Error("No response from AI");
    }

    // Check if AI wants to use the tool
    if (generatedText.tool_calls && generatedText.tool_calls.length > 0) {
      console.log("AI is using image generation tool");

      const toolCall = generatedText.tool_calls[0];

      // Parse the translated/optimized prompt
      const functionArgs = JSON.parse(toolCall.function.arguments);
      const translatedPrompt = functionArgs.prompt;

      console.log("Translated prompt:", translatedPrompt);

      // Execute the actual image generation
      const imageResult = await generateImage(translatedPrompt);

      if (!imageResult.success) {
        throw new Error(imageResult.error || "Image generation failed");
      }

      // Add assistant's tool call to messages
      messages.push({
        role: "assistant",
        content: generatedText.content || null,
      });

      // Add tool response to messages
      messages.push({
        role: "tool",
        content: JSON.stringify({
          success: true,
          imageUrl: imageResult.imageUrl,
          message: "Image generated successfully",
        }),
        tool_call_id: toolCall.id,
      });

      // Get final response from AI (friendly message in Persian)
      const finalResponse = await client.chat.completions.create({
        model: "google/gemini-2.0-flash-001",
        messages: messages,
        max_tokens: 200,
        temperature: 1,
      });

      const finalMessage = finalResponse.choices[0]?.message?.content?.trim();

      return {
        success: true,
        imageUrl: imageResult.imageUrl,
        message: finalMessage || "تصویر شما آماده است!",
        translatedPrompt: translatedPrompt, // Include this for debugging
      };
    } else {
      // AI didn't call the tool - handle gracefully
      console.warn("AI did not use image generation tool");

      // Force translation and generation
      const fallbackPrompt = generatedText.content || prompt;
      const imageResult = await generateImage(fallbackPrompt);

      if (!imageResult.success) {
        throw new Error(imageResult.error || "Image generation failed");
      }

      return {
        success: true,
        imageUrl: imageResult.imageUrl,
        message: "تصویر شما آماده است!",
        translatedPrompt: fallbackPrompt,
      };
    }
  } catch (error) {
    console.error("Image generator error:", error);
    throw new Error(error.message || "Failed to generate image");
  }
}
