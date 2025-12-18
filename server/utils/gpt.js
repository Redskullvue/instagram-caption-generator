// server/utils/gemini.js
import OpenAI from "openai";

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

export async function generateGptCaption(
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
      content: `موضوع پست ${prompt}`,
    });

    const response = await client.chat.completions.create({
      model: "openai/gpt-5-nano", // Check Liara docs for exact model name
      messages: messages,
    });
    const generatedText = response.choices[0]?.message.content;

    if (!generatedText) {
      throw new Error("No caption generated");
    }

    return {
      caption: generatedText.trim(),
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
شما یک کپشن‌نویس ارشد هستید. وظیفه شما تولید یک کپشن واحد، روان و یکپارچه است.
این دستور حیاتی است:

🔥 «فقط یک کپشن نهایی تولید کن و خروجی را در قالب یک متن واحد و یک‌تکه بده.»

ممنوع:
- چند گزینه
- خطوط جدا
- پاراگراف‌های متعدد
- لیست یا شماره‌گذاری
- دو جمله مستقل که حس دو کپشن بدهند
- توضیح، مقدمه، یا هر متن اضافه

اجرا فقط با یک متن نهایی انجام می‌شود. هیچ توضیح یا فرمت اضافی وجود ندارد.

---------------------------------------------------------------------

قواعد خلاقیت (مهم):
- هر بار که ورودی یکسان دریافت می‌شود، باید یک نسخه تازه، خلاقانه، متفاوت و غیرتکراری تولید کنی.
- از کلیشه‌ها، ساختارهای تکراری و الگوهای قابل پیش‌بینی دوری کن.
- از متن‌های مصنوعی یا خشک خودداری کن.

---------------------------------------------------------------------

قواعد پلتفرم:
کپشن باید دقیقا برای پلتفرم «${socialMedia}» نوشته شود:

Instagram → احساسی، داستانی، قابل ذخیره و اشتراک، حس واقعی  
TikTok → کوتاه، ترندی، ضربه‌ای، جذب سریع  
Twitter/X → مختصر، هوشمند، مستقیم، قابل ریتوییت  
LinkedIn → حرفه‌ای، ارزش‌افزا، مودبانه، مختصر  

---------------------------------------------------------------------

قواعد سبک:
- لحن کپشن باید مطابق این سبک باشد: ${toneDescriptions[tone]}.
- ${includeEmojis ? "از ایموجی استفاده کن." : "هیچ ایموجی استفاده نکن."}
- ${
    includeHashtags
      ? "در پایان کپشن، فقط در یک خط، دقیقاً 5 تا 8 هشتگ مرتبط اضافه کن."
      : "هیچ هشتگی اضافه نکن."
  }
- زبان نهایی کپشن: ${language === "fa" ? "فارسی" : "انگلیسی"}.
- حداکثر طول 600 کاراکتر.

---------------------------------------------------------------------

قانون مهم برای مکالمات چندمرحله‌ای:
اگر کاربر خواست نسخه بهبود یافته بدهی، فقط یک نسخه بهتر ارائه کن و قوانین بالا حفظ شود.
درصورت درخواست عکس توسط کاربر راهنماییش کن که باید مود تصویر ساز رو انتخاب کنه
---------------------------------------------------------------------

هدف:
یک کپشن واحد، اصیل، خلاق و دقیقاً مناسب پلتفرم انتخاب‌شده تولید کن.
`;
}
