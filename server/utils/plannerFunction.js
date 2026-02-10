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
-اولین روز هفته در ایران شنبه میباشد پس روز اول رو همیشه شنبه در نظر بگیر
-تو آزادی تا با توجه به اطلاعاتی که از username بدست آوردی برنامه ریزی کنی تسک هایی که تو روز ایجاد میکنی محدودیتی ندارند و میتوانند چند تا باشند
1. خروجی باید فقط یک برنامه نهایی باشد (بدون هیچ توضیح اضافی).
2. ساختار خروجی باید به‌صورت لیست منظم باشد، اما بدون شماره‌گذاری رسمی. فقط با خط جدید جدا شوند.
3. هر روز باید شامل:
- هر روز میتواند بیشتر از یک نوع محتوا قرار بگیرد این رو با توجه به اطلاعات دریافتی از ابزار تایین کن
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

async function generateStructuredJson(
  client,
  textPlan,
  instagramData,
  options,
) {
  const { tone, socialMedia, includeEmojis, includeHashtags } = options;

  const jsonSystemPrompt = `
تو یک تحلیلگر داده هستی. یک برنامه محتوایی متنی به تو داده می‌شود و باید آن را به JSON ساختاریافته تبدیل کنی.

فرمت خروجی دقیقاً باید این باشد:
هیچ محدودیتی برای آرایه schedule وجود ندارد و میتوانی هرچند کار که نیاز هست درون آن قرار دهی 

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
      "title": "عنوان ایده رو خودت خلاصه کن بنویس",
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
   "contentTypesDistribution": {reels , post , video , carousel , story} ,
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
      model: "openai/gpt-5-nano",
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

export { buildSystemPrompt, generateStructuredJson };
