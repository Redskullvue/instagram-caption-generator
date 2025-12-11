// server/utils/gemini.js
import OpenAI from "openai";

let openaiClient = null;

function getOpenAIClient() {
  if (!openaiClient) {
    const config = useRuntimeConfig();

    openaiClient = new OpenAI({
      apiKey: config.geminiApiKey,
      baseURL: config.geminiBaseUrl, // Liara's endpoint
    });
  }

  return openaiClient;
}

export async function generateGemeniPlan(
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
      content: `موضوع پیج ${prompt}`,
    });

    const response = await client.chat.completions.create({
      model: "google/gemini-2.0-flash-001", // Check Liara docs for exact model name
      messages: messages,
      max_tokens: 1024,
      temperature: 1,
    });

    const generatedText = response.choices[0]?.message?.content;

    if (!generatedText) {
      throw new Error("No caption generated");
    }

    return {
      plan: generatedText.trim(),
      usage: {
        promptTokens: response.usage?.prompt_tokens || 0,
        completionTokens: response.usage?.completion_tokens || 0,
        totalTokens: response.usage?.total_tokens || 0,
      },
    };
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
تو یک استراتژیست حرفه‌ای تولید محتوا هستی و وظیفه تو ساخت یک برنامه محتوایی دقیق، خلاقانه و منظم برای یک پیج ${socialMedia} است.

نوع برنامه محتوایی که باید تولید کنی: «هفتگی»  (هفتگی یا ماهانه)
درصورت وجود لینک اگر نتوستی آن را بررسی کنی با توجه به URL حدس بزن و محتوای مربوطه بده
قوانین مهم:
1. خروجی باید فقط یک برنامه نهایی باشد (بدون هیچ توضیح اضافی).
2. ساختار خروجی باید به‌صورت لیست منظم باشد، اما بدون شماره‌گذاری رسمی. فقط با خط جدید جدا شوند.
3. هر روز باید شامل:
   - عنوان ایده محتوا
   - توضیح کوتاه ۱ خطی درباره اینکه چه چیزی گفته می‌شود
   - فرم محتوا (پست، ریلز، استوری، کاروسل، ویدیو، نکته، آموزش و…)
4. محتوا باید کاملاً مرتبط با موضوع باشد.
5. لحن برنامه باید مطابق این سبک باشد: ${toneDescriptions[tone]}.
6. اگر ${
    includeEmojis ? "بله" : "خیر"
  }، از ایموجی‌های کاملاً طبیعی و مرتبط استفاده کن.
7. هیچ متن تکراری، کلیشه‌ای یا رباتیک تولید نکن. هر ایده باید خلاقانه، جدید و کاربردی باشد.
8. خروجی باید انسان‌گونه و قابل انتشار باشد.
9. فقط برنامه را بده. هیچ گونه توصیه، مقدمه، یا توضیح اضافه ممنوع است.
10.اگر${includeHashtags ? "هشتگ نیاز است" : "هشتگ نیاز نیست"}    
حالا یک برنامه محتوایی کامل هفتگی برای موضوع تولید کن.
`;
}
