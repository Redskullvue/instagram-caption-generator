// server/utils/gemini.js
import OpenAI from "openai";
import { aiEngines } from "./aiList";

let openaiClient = null;

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
  const selectedAI = aiEngines.find(
    (engine) => engine.name === selectedAiEngine,
  );
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
5) معمولا قالب کپشن های ایسنتاگرامی به صورت زیر هست 
متن
.
متن
.
متن

---------------------------------------------------------------------

📌 قانون گفتگوهای چندمرحله‌ای:
اگر کاربر نسخه بهبود‌یافته خواست، فقط یک نسخه بهتر بده و همه قوانین حفظ شود.
درصورت درخواست عکس توسط کاربر راهنماییش کن که باید مود تصویر ساز رو انتخاب کنه

---------------------------------------------------------------------

🎯 هدف نهایی:
تولید فقط یک کپشن واحد، طبیعی، احساسی، خلاق و ۱۰۰٪ مناسب پلتفرم انتخاب‌شده.
`;
}
