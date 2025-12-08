<template>
  <div
    class="w-full flex items-center flex-col min-h-screen p-4 lg:p-10 bg-pink-100"
  >
    <div class="w-full flex items-center justify-center">
      <div class="bg-white py-2 rounded-xl px-8 mb-20">
        <p
          class="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          تماس با ما
        </p>
      </div>
    </div>
    <div class="w-full flex items-center justify-center p-1 mb-4">
      <p class="text-center w-full text-3xl lg:text-4xl">
        تماس با
        <span
          class="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >کپشن ساز</span
        >
      </p>
    </div>
    <!-- Contact Information Box -->
    <div
      class="2xl:max-w-[80%] w-full rounded-xl bg-white shadow-md shadow-gray-300 h-max p-6 mt-10 flex flex-col justify-center items-center"
    >
      <h2 class="text-2xl text-gray-700 w-full mb-6">راه های ارتباطی</h2>
      <div
        class="w-full rounded-xl border border-gray-300 flex items-center gap-x-3 p-6 lg:w-[65%]"
      >
        <div
          class="bg-purple-100 rounded-xl p-3 flex items-center justify-center"
        >
          <Icon
            name="material-symbols:mail-outline"
            size="35px"
            class="text-purple-500"
          />
        </div>
        <div
          class="flex items-center justify-between w-full flex-col lg:flex-row"
        >
          <p class="w-full">ایمیل</p>
          <p class="mt-4 w-full lg:mt-0 text-start lg:w-max">
            info@captionsaz.ir
          </p>
        </div>
      </div>
      <div
        class="w-full rounded-xl border border-gray-300 flex items-center gap-x-3 p-6 mt-6 lg:w-[65%]"
      >
        <div
          class="bg-pink-100 rounded-xl p-3 flex items-center justify-center"
        >
          <Icon name="mdi:instagram" size="35px" class="text-pink-500" />
        </div>
        <div
          class="flex items-center justify-between w-full flex-col lg:flex-row"
        >
          <p class="w-full">اینستاگرام</p>
          <p class="mt-4 w-full lg:mt-0 text-start lg:w-max">captionsaz@</p>
        </div>
      </div>
      <small class="text-sm mt-6 text-gray-600"
        >با افتخار پاسخگو شما هستیم</small
      >
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "تماس با ما",
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
    { property: "og:url", content: "https://captionsaz.ir/contact-us" },
  ],
  link: [{ rel: "canonical", href: "https://captionsaz.ir/contact-us" }],
});
</script>
