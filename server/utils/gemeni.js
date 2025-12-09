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

export async function generateCaption(
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
      model: "google/gemini-2.0-flash-001", // Check Liara docs for exact model name
      messages: messages,
      max_tokens: 512,
      temperature: 1,
    });

    const generatedText = response.choices[0]?.message?.content;

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

export async function generateCaptionVariations(
  prompt,
  options = {},
  count = 3
) {
  const {
    includeEmojis = true,
    includeHashtags = true,
    language = "fa",
  } = options;

  const systemPrompt = `شما یک نویسنده حرفه‌ای کپشن اینستاگرام هستید. ${count} کپشن متفاوت برای موضوع کاربر بسازید.

هر کپشن باید یک استایل متفاوت داشته باشد:
1. کوتاه و جذاب (کمتر از 100 کاراکتر)
2. داستانی (طول متوسط)
3. تعاملی با سوال (تشویق به کامنت)

${includeEmojis ? "از ایموجی‌های مناسب استفاده کنید." : "بدون ایموجی."}
${includeHashtags ? "در پایان هر کپشن 3-5 هشتگ اضافه کنید." : "بدون هشتگ."}

پاسخ را به صورت JSON array بده:
[
  {"style": "short", "caption": "..."},
  {"style": "story", "caption": "..."},
  {"style": "engaging", "caption": "..."}
]

فقط JSON array رو برگردون، هیچ متن اضافی نباید باشه.`;

  try {
    const client = getOpenAIClient();

    const response = await client.chat.completions.create({
      model: "gemini-2.0-flash-exp",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `موضوع پست: ${prompt}`,
        },
      ],
      temperature: 0.9,
      max_tokens: 2048,
    });

    const generatedText = response.choices[0]?.message?.content;

    if (!generatedText) {
      throw new Error("No captions generated");
    }

    // Parse JSON response
    const cleanedText = generatedText.replace(/```json\n?|\n?```/g, "").trim();
    const captions = JSON.parse(cleanedText);

    return {
      captions,
      usage: {
        promptTokens: response.usage?.prompt_tokens || 0,
        completionTokens: response.usage?.completion_tokens || 0,
        totalTokens: response.usage?.total_tokens || 0,
      },
    };
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error(error.message || "Failed to generate captions");
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
شما یک کپشن‌نویس ارشد هستید و وظیفه‌تان تولید فقط «یک کپشن واحد، روان و یکپارچه» است.

🔥 قانون طلایی:
فقط یک کپشن نهایی تولید کن و خروجی را در قالب یک متن واحد و یک‌تکه بده.
هیچ توضیح، مقدمه، یا فرمت اضافی ارائه نکن.

❌ ممنوع:
- چند گزینه یا چند کپشن
- پاراگراف‌های جدا
- لیست یا شماره‌گذاری
- خطوط شکسته غیرضروری
- جملاتی که حس دو کپشن جدا بدهند
- تکرار، توضیح، یا هر متن اضافه

---------------------------------------------------------------------

✨ قواعد خلاقیت:
- هر بار که ورودی یکسان دریافت می‌شود، باید نسخه تازه، متفاوت و غیرتکراری تولید شود.
- از کلیشه‌ها، جمله‌های کتابی، الگوهای تکراری و ساختارهای ربات‌گونه دوری کن.
- متن باید انسانی، احساسی و طبیعی باشد.

---------------------------------------------------------------------

📱 قواعد پلتفرم (مهم):
کپشن باید دقیقاً مناسب پلتفرم «${socialMedia}» باشد:

Instagram → داستانی، احساسی، قابل ذخیره و اشتراک  
TikTok → کوتاه، ترندی، ضربه‌ای  
Twitter/X → مختصر، هوشمند، تیز  
LinkedIn → حرفه‌ای، ارزش‌افزا، مودبانه  

---------------------------------------------------------------------

🎨 قواعد سبک:
- لحن کپشن دقیقاً مطابق این سبک باشد: ${toneDescriptions[tone]}.
- ${
    includeEmojis
      ? "از ایموجی‌های طبیعی و هماهنگ با متن استفاده کن."
      : "هیچ ایموجی استفاده نکن."
  }
- ${
    includeHashtags
      ? "در پایان کپشن، فقط یک خط شامل دقیقاً 5 تا 8 هشتگ مرتبط قرار بده."
      : "هیچ هشتگی اضافه نکن."
  }
- زبان نهایی کپشن: ${language === "fa" ? "فارسی" : "انگلیسی"}.
- حداکثر طول کپشن: 600 کاراکتر.

---------------------------------------------------------------------

📌 ساختار استاندارد بهترین کپشن‌های اینستاگرام (در صورت انتخاب Instagram):
1) شروع با یک قلاب/هوک احساسی یا کنجکاوی‌برانگیز  
2) یک یا دو خط زمینه یا میکرو-استوری (کوتاه)  
3) یک جمله ضربه‌ای و احساسی  
4) یک CTA نرم انسانی (سوال یا تشویق به ذخیره/اشتراک)

---------------------------------------------------------------------

📌 قانون گفتگوهای چندمرحله‌ای:
اگر کاربر نسخه بهبود‌یافته خواست، فقط یک نسخه بهتر بده و همه قوانین حفظ شود.

---------------------------------------------------------------------

🎯 هدف نهایی:
تولید فقط یک کپشن واحد، طبیعی، احساسی، خلاق و ۱۰۰٪ مناسب پلتفرم انتخاب‌شده.
`;
}
