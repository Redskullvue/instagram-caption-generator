// server/utils/gemini.js
import OpenAI from "openai";
import { tools, getInstagramData } from "~~/server/utils/tools";
let openaiClient = null;

function getOpenAIClient() {
  if (!openaiClient) {
    const config = useRuntimeConfig();

    openaiClient = new OpenAI({
      apiKey: config.gptApiKey,
      baseURL: config.geminiBaseUrl, // Liara's endpoint
    });
  }

  return openaiClient;
}

export async function generateGptPlan(
  prompt,
  options = {},
  conversationHistory = []
) {
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
    const client = getOpenAIClient();

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
      model: "openai/gpt-5-nano", // Check Liara docs for exact model name
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
        model: "openai/gpt-5-nano",
        messages: messages,
      });

      if (!finalResponse) {
        throw new Error("No Plan Generated");
      }

      return {
        plan: finalResponse.choices[0].message.content.trim(),
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

      return {
        plan: generatedText.content.trim(),
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

function buildSystemPrompt({
  tone,
  socialMedia,
  includeEmojis,
  includeHashtags,
  language,
  maxLength,
}) {
  const toneDescriptions = {
    casual: "دوستانه، راحت و صمیمی",
    professional: "رسمی، حرفه‌ای و شیک",
    funny: "طنز، بامزه و سرگرم‌کننده",
    inspirational: "انگیزشی، مثبت و امیدوارکننده",
    edgy: "جسورانه، ترند و جذاب",
  };

  return `
  تو یک استراتژیست حرفه‌ای تولید محتوا هستی. وظیفه تو ساخت یک برنامه محتوایی دقیق، خلاق، منظم و ۱۰۰٪ مرتبط برای پلتفرم «${socialMedia}» است.

نوع برنامه: «برنامه هفتگی کامل و واقعی»


قوانین مهم:
- اگر کاربر نام کاربری اینستاگرام داد، **حتماً** از ابزار getInstagramData استفاده کن
- بدون استفاده از ابزار، هیچ وقت نگو که نمی‌توانی اطلاعات را ببینی
- اگر نام کاربری معتبر است، ابزار را فراخوانی کن
- بعد از بررسی و دریافت اطلاعات پیج کاربر خلاصه دریافتی هات رو اول شرح بده
-درصورت بروز هرگونه مشکل با دریافت اطلاعات فقط از روی username حدس بزن

❗ قانون اصلی:
اگر پلتفرم = LinkedIn  
⇐ فقط و فقط برنامه هفتگی مخصوص لینکدین تولید کن.  
اگر پلتفرم = Instagram  
⇐ فقط مخصوص اینستاگرام.  
اگر پلتفرم = tiktok  
⇐ فقط مخصوص تیک تاک.  
اگر پلتفرم = youtube  
⇐ فقط مخصوص یوتیوب.  
(هیچ ایده اشتباهی بین پلتفرم‌ها نباید تولید شود)

❗ ساختار خروجی الزامی:
خروجی باید دقیقاً شامل ۷ بخش باشد (برای هر روز هفته):
-روز هفته
- عنوان ایده محتوا
- توضیح کوتاه یک‌خطی
- فرم محتوا مخصوص همان پلتفرم  
  (در لینکدین: پست حرفه‌ای / مقاله / تجربه کاری / نکته مدیریتی / داستان شغلی  
   در اینستاگرام: ریلز، پست، کاروسل، استوری، ویدیو و ...)
(در تیک تاک : پست کوتاه / سوار بر ترند روز / ریلز ویدیو و ...)
(در یوتیوب : پست shorts ، ویدیو بلندمدت )

❗ اگر لینک ارسال شده وجود دارد:
اگر نتوانستی آن را بررسی کنی، فقط براساس نوع URL حدس بزن که پیج مربوط به چه حوزه‌ای است.

❗ قوانین مهم:
1. خروجی باید فقط یک برنامه هفتگی کامل باشد.
2. هیچ مقدمه، توضیح اضافه یا جمع‌بندی ممنوع است.
3. ایده‌ها نباید تکراری، کلیشه‌ای یا رباتیک باشند.
4. لحن باید دقیقاً مطابق این سبک باشد: ${toneDescriptions[tone]}.
5. ${
    includeEmojis
      ? "از ایموجی‌های طبیعی و مرتبط استفاده کن و همچنین میتونی برای شمارش از emoji استفاده کنی."
      : "هیچ ایموجی استفاده نکن."
  }
6. ${
    includeHashtags
      ? "در هر روز، در پایان فقط 3 هشتگ مرتبط اضافه کن."
      : "هشتگ اضافه نکن."
  }

حالا برنامه هفتگی را تولید کن.
در صورت تقاضای کاربر جهت تولید عکس  بهش بگو که درخالت برنامه ریز هستش و باید به حالت تصویر ساز بره برای تولید عکس
`;
}
