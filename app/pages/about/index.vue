<template>
  <div class="min-h-screen w-full bg-pink-100 flex flex-col items-center p-10">
    <div class="w-full flex items-center justify-center">
      <Transition name="fade" appear>
        <div class="bg-white py-2 rounded-xl px-8 mb-20">
          <p
            class="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >
            درباره ما
          </p>
        </div>
      </Transition>
    </div>
    <div class="w-full flex items-center justify-center p-1 mb-4">
      <p class="text-center w-full text-3xl lg:text-4xl">
        داستان
        <span
          class="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >کپشن ساز</span
        >
      </p>
    </div>
    <p
      class="text-center w-full text-balance text-gray-600 mb-10 lg:max-w-[80ch]"
    >
      ما تیمی از علاقه‌مندان به هوش مصنوعی و بازاریابی دیجیتال هستیم که با هدف
      کمک به سازندگان محتوای فارسی‌زبان برای موفقیت در اینستاگرام، کپشن ساز را
      راه‌اندازی کردیم
    </p>
    <!-- Boxes -->
    <div
      class="w-full grid grid-cols-2 lg:grid-cols-4 self-center gap-y-3 gap-x-2 lg:gap-x-4 min-h-[250px] mt-10 2xl:max-w-[80%] mb-10"
    >
      <div
        v-for="(box, index) in boxes"
        :key="index"
        class="bg-white p-4 rounded-xl shadow-gray-300 shadow-md flex items-center justify-center flex-col"
      >
        <p
          class="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-2xl lg:text-3xl mb-10"
        >
          {{ box.value }}
        </p>

        <p class="text-gray-600 text-center">{{ box.title }}</p>
      </div>
    </div>
    <!-- colorful section -->
    <div
      class="w-full p-8 text-white bg-linear-to-r from-purple-600 mb-20 to-pink-600 min-h-[200px] mt-10 2xl:max-w-[80%] rounded-xl 2xl:min-h-[300px]"
    >
      <h2
        class="w-full flex gap-x-3 text-2xl lg:text-3xl items-center mb-6 font-bold"
      >
        <Icon name="mdi:instagram" size="45px" />
        ماموریت ما
      </h2>
      <p class="text-sm lg:text-base mb-8">
        در دنیای امروز، اینستاگرام یکی از قدرتمندترین ابزارها برای ارتباط با
        مخاطبان است. اما نوشتن کپشن‌های جذاب و اثرگذار می‌تواند چالش‌برانگیز
        باشد. ما کپشن‌سرا را ساختیم تا با قدرت هوش مصنوعی، این فرآیند را ساده،
        سریع و حرفه‌ای کنیم.
      </p>
      <p class="text-sm lg:text-base">
        هدف ما این است که هر فردی، از اینفلوئنسرها تا کسب‌وکارها، بتواند با
        اطمینان محتوای باکیفیت تولید کند و بر روی آنچه واقعاً مهم است - خلاقیت و
        ارتباط با مخاطبان - تمرکز کند.
      </p>
    </div>

    <!-- Our principles -->
    <div class="w-full min-h-[200px] lg:min-h-[300px] 2xl:max-w-[80%] mb-20">
      <h2 class="w-full text-center mb-6 xl:text-3xl text-2xl font-bold">
        ارزش‌های ما
      </h2>
      <p class="w-full text-center mb-10">اصولی که ما را هدایت می‌کند</p>
      <div class="w-full grid-cols-1 lg:grid-cols-2 grid gap-4">
        <div
          v-for="(valueBox, index) in valueBoxes"
          :key="index"
          class="w-full bg-white shadow-md shadow-gray-300 flex gap-x-3 p-4 rounded-xl items-center min-h-[130px]"
        >
          <div
            class="w-14 h-14 rounded-xl bg-purple-300 mb-8 flex items-center justify-center text-purple-700 p-3"
          >
            <Icon :name="valueBox.icon" size="30px" />
          </div>
          <div class="flex flex-col gap-y-2">
            <p class="lg:text-xl text-base">{{ valueBox.title }}</p>
            <p class="text-gray-600 lg:text-sm text-xs">{{ valueBox.value }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Why CaptionSaz -->
    <div
      class="w-full 2xl:max-w-[80%] lg:min-h-[370px] min-h-[350px] bg-white rounded-xl p-4"
    >
      <h2 class="w-full text-center text-lg lg:text-2xl mb-4">
        چرا کپشن ساز ؟
      </h2>
      <p class="text-gray-500 text-center w-full text-xs lg:text-base mb-10">
        چه چیزی ما را متفاوت می‌کند
      </p>
      <!-- Why Us Boxes -->
      <div class="w-full flex flex-col gap-y-8">
        <div class="w-full flex gap-x-3">
          <div class="w-max">
            <div
              class="w-8 h-8 rounded-full bg-linear-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center"
            >
              <Icon name="ant-design:rise-outlined" size="20px" />
            </div>
          </div>
          <div class="w-full">
            <p>هوش مصنوعی پیشرفته فارسی</p>
            <p class="text-gray-500 mt-2 text-sm">
              اولین و بهترین ابزار تولید کپشن فارسی با استفاده از جدیدترین
              فناوری‌های AI
            </p>
          </div>
        </div>
        <div class="w-full flex gap-x-3">
          <div class="w-max">
            <div
              class="w-8 h-8 rounded-full bg-linear-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center"
            >
              <Icon name="mdi:heart-outline" size="20px" />
            </div>
          </div>
          <div class="w-full">
            <p>ساخته شده با عشق برای فارسی‌زبانان</p>
            <p class="text-gray-500 mt-2 text-sm">
              متناسب با فرهنگ و زبان فارسی طراحی شده است
            </p>
          </div>
        </div>
        <div class="w-full flex gap-x-3">
          <div class="w-max">
            <div
              class="w-8 h-8 rounded-full bg-linear-to-r from-purple-600 to-pink-600 text-white flex items-center justify-center"
            >
              <Icon name="iconoir:flash" size="20px" />
            </div>
          </div>
          <div class="w-full">
            <p>سرعت بالا و کیفیت عالی</p>
            <p class="text-gray-500 mt-2 text-sm">
              کپشن‌های باکیفیت را در عرض چند ثانیه دریافت کنید
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "درباره کپشن ساز",
  meta: [
    {
      name: "description",
      content:
        "درباره تیم کپشن ساز و ماموریت ما : کمک به تولید کنندگان محتوا برای بهتر دیده شدن در شبکه های مجازی و افزایش سرعت تولید محتوای این افراد",
    },
    { property: "og:title", content: "درباره ما | کپشن‌ساز" },
    {
      property: "og:description",
      content:
        "آشنایی با تیم و هدف کپشن‌ساز؛ چطور به تولیدکنندگان کمک می‌کنیم در اکسپلور دیده شوند.",
    },
    { property: "og:url", content: "https://captionsaz.ir/about" },
  ],
  link: [{ rel: "canonical", href: "https://captionsaz.ir/about" }],
});

const boxes = [
  { title: "کاربر فعال", value: "+500" },
  { title: "کپشن ها", value: "+10,000" },
  { title: "رضایت کاربران", value: "99%" },
  { title: "پشتیابنی", value: "24/7" },
];

const valueBoxes = [
  {
    title: "اشتیاق به محتوا",
    value: "ما عاشق کمک به سازندگان محتوا برای درخشش در اینستاگرام هستیم",
    icon: "mdi:heart-outline",
  },
  {
    title: "نوآوری مستمر",
    value: "همیشه در حال بهبود و اضافه کردن قابلیت‌های جدید برای شما",
    icon: "iconoir:flash",
  },
  {
    title: "جامعه محور",
    value: " موفقیت شما، موفقیت ماست. همیشه به بازخورد شما گوش می‌دهیم",
    icon: "mynaui:users",
  },
  {
    title: "کیفیت برتر",
    value: "تنها بهترین کپشن‌ها با کیفیت حرفه‌ای برای شما تولید می‌کنیم",
    icon: "uil:medal",
  },
];
</script>
