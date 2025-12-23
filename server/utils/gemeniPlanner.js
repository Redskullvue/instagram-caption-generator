// server/utils/gemini.js
import OpenAI from "openai";
import { tools, getInstagramData } from "~~/server/utils/tools";
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
      content: `${prompt}`,
    });

    const availableTools = toolPicker("getInstagramData");
    // Use tools if needed
    const response = await client.chat.completions.create({
      model: "google/gemini-2.0-flash-001", // Check Liara docs for exact model name
      messages: messages,
      max_tokens: 1024,
      temperature: 1,
      tools: tools,
      tool_choice: "auto",
    });

    const generatedText = response.choices[0]?.message;

    if (generatedText.tool_calls) {
      console.log("AI USING TOOLS TO PLAN");

      // Add the assistant's message with tool_calls to the conversation
      const cleanAssistantMessage = {
        role: generatedText.role,
        content: generatedText.content || "",
      };
      messages.push(cleanAssistantMessage);

      // Select which tool ai is using and what argument it's passing
      const toolCall = generatedText.tool_calls[0];
      const functionArgs = JSON.parse(toolCall.function.arguments);
      const username = functionArgs.username;

      // Execute the tool function
      const toolResponse = await getInstagramData(username);

      // Add the tool response to messages with correct format
      messages.push({
        role: "tool",
        content: JSON.stringify(toolResponse),
        tool_call_id: toolCall.id,
      });

      // Get final response after tool execution
      // We used Var Here so outside the block we can have access to this data as well
      const finalResponse = await client.chat.completions.create({
        model: "google/gemini-2.0-flash-001",
        messages: messages,
        max_tokens: 1024,
        temperature: 1,
      });

      //return the final answer
      if (!finalResponse) {
        throw new Error("No caption generated");
      }
      const jsonPlan = await generateStructuredJson(
        client,
        finalResponse.choices[0].message.content,
        generatedText.content,
        { tone, socialMedia, includeEmojis, includeHashtags }
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
        throw new Error("No Plan generated");
      }
      const jsonPlan = await generateStructuredJson(
        client,
        "",
        generatedText.content,
        { tone, socialMedia, includeEmojis, includeHashtags }
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

// NEW: Separate function to generate structured JSON
async function generateStructuredJson(
  client,
  textPlan,
  instagramData,
  options
) {
  const { tone, socialMedia, includeEmojis, includeHashtags } = options;

  const jsonSystemPrompt = `
تو یک تحلیلگر داده هستی. یک برنامه محتوایی متنی به تو داده می‌شود و باید آن را به JSON ساختاریافته تبدیل کنی.

فرمت خروجی دقیقاً باید این باشد:

{
  "metadata": {
    "platform": "${socialMedia}",
    "tone": "${tone}",
    "createdAt": "تاریخ فعلی ISO",
    "hasInstagramData": ${instagramData ? "true" : "false"}
  },
  "schedule": [
    {
      "day": "نام روز",
      "dayNumber": شماره روز (1-7) ، روز اول هفته شنبه =1,
      "title": "عنوان ایده",
      "description": "توضیح کوتاه",
      "contentType": "نوع محتوا",
      "category": "دسته‌بندی",
      "emoji": "${includeEmojis ? "ایموجی" : ""}",
      "hashtags": ${includeHashtags ? "آرایه هشتگ‌ها" : "[]"},
      "estimatedTime": "زمان پیشنهادی (مثلاً 18:00)",
      "priority": "high/medium/low"
    }
  ],
  "summary": {
    "totalPosts": تعداد کل,
    "contentTypesDistribution": {},
    "keyFocus": "محور اصلی"
  }
}

قوانین:
- خروجی فقط JSON معتبر (بدون markdown)
- همه روزهای هفته باید وجود داشته باشند
- contentType: "ریلز" | "پست" | "کاروسل" | "استوری" | "ویدیو"
- category: "آموزشی" | "تعاملی" | "الهام‌بخش" | "تبلیغاتی" | "سرگرمی"
- priority را بر اساس اهمیت محتوا تعیین کن
`;

  try {
    const jsonResponse = await client.chat.completions.create({
      model: "google/gemini-2.0-flash-001",
      messages: [
        {
          role: "system",
          content: jsonSystemPrompt,
        },
        {
          role: "user",
          content: `برنامه متنی:\n\n${textPlan}\n\nاین برنامه را به JSON تبدیل کن.`,
        },
      ],
      max_tokens: 2048,
      temperature: 0.3, // Lower temperature for structured output
    });

    const jsonContent = jsonResponse.choices[0]?.message?.content?.trim();

    // Try to extract and parse JSON
    const jsonMatch = jsonContent.match(/```json\n([\s\S]*?)\n```/);
    const jsonString = jsonMatch ? jsonMatch[1] : jsonContent;

    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to generate structured JSON:", error);
    // Return a basic structure if parsing fails
    return {
      metadata: {
        platform: socialMedia,
        tone: tone,
        createdAt: new Date().toISOString(),
        hasInstagramData: !!instagramData,
        parseError: true,
      },
      schedule: [],
      summary: {
        totalPosts: 0,
        contentTypesDistribution: {},
        keyFocus: "خطا در تجزیه برنامه",
      },
      rawText: textPlan,
    };
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
قوانین مهم:
- اگر کاربر نام کاربری اینستاگرام داد، **حتماً** از ابزار getInstagramData استفاده کن
- بدون استفاده از ابزار، هیچ وقت نگو که نمی‌توانی اطلاعات را ببینی
- اگر نام کاربری معتبر است، ابزار را فراخوانی کن
- بعد از بررسی و دریافت اطلاعات پیج کاربر خلاصه دریافتی هات رو اول شرح بده
-درصورت بروز هرگونه مشکل با دریافت اطلاعات فقط از روی username حدس بزن
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
11. قبل از نوشتن برنامه به کاربر اطلاع بده که میتونه در بخش تقویم ها برنامه های هفتگی رو مشاهده و مدیریت کنه    
حالا یک برنامه محتوایی کامل هفتگی برای موضوع تولید کن.
درصورت درخواست عکس توسط کاربر راهنماییش کن که باید مود تصویر ساز رو انتخاب کنه و  ذر هیج صورت از ابزار imageGenerator استفاده نکن
`;
}
