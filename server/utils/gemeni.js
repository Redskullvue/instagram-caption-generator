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

export async function generateCaption(prompt, options = {}) {
  const {
    tone = "casual",
    includeEmojis = true,
    includeHashtags = true,
    language = "fa", // Default Persian
    maxLength = 500,
  } = options;

  const systemPrompt = buildSystemPrompt({
    tone,
    includeEmojis,
    includeHashtags,
    language,
    maxLength,
  });

  try {
    const client = getOpenAIClient();

    const response = await client.chat.completions.create({
      model: "google/gemini-2.0-flash-001", // Check Liara docs for exact model name
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
      temperature: 0.8,
      max_tokens: 1024,
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

  const languageInstructions = {
    fa: "کپشن را به زبان فارسی بنویس.",
    en: "Write the caption in English.",
  };

  return `شما یک نویسنده متخصص کپشن اینستاگرام هستید. یک کپشن جذاب و تاثیرگذار بر اساس موضوع کاربر بسازید.

الزامات استایل:
- تُن: ${toneDescriptions[tone] || toneDescriptions.casual}
- ${
    includeEmojis
      ? "از ایموجی‌های مناسب در کپشن استفاده کن"
      : "بدون استفاده از ایموجی"
  }
- ${includeHashtags ? "در پایان 3-5 هشتگ مرتبط اضافه کن" : "بدون هشتگ"}
- حداکثر طول: ${maxLength} کاراکتر
- ${languageInstructions[language] || languageInstructions.fa}

راهنماها:
- کپشنی بساز که چشم‌گیر باشه و توجه رو جلب کنه
- ارتباط احساسی با مخاطب برقرار کن
- در صورت مناسب بودن، یک call-to-action اضافه کن
- اصیل و واقعی بنویس
- از کلیشه‌ها و عبارات تکراری دوری کن

فقط متن کپشن رو برگردون، هیچ چیز دیگه‌ای نباشه.`;
}
