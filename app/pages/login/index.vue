<template>
  <div class="w-full h-full flex items-center lg:p-10 p-4">
    <div
      class="w-full lg:w-10/12 h-full rounded-xl bg-white p-4 shadow-lg shadow-gray-300 flex flex-col 2xl:items-center 2xl:justify-center"
    >
      <h2
        class="w-full text-center text-lg font-semibold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
      >
        ورود به حساب کاربری
      </h2>
      <p class="w-full text-center text-gray-600 mt-3 mb-12">
        به کپشن ساز خوش آمدید
      </p>
      <!-- Form -->
      <div class="w-full h-max">
        <LoginForm />
      </div>
      <div class="w-full text-center text-gray-600 text-sm mt-10 mb-3">
        حساب کاربری ندارید ؟<span class="text-purple-500 mx-1"
          ><NuxtLink to="/signup">ثبت نام کنید</NuxtLink></span
        >
      </div>
      <div class="w-full text-center text-gray-600 text-sm">
        فراموشی رمز عبور؟<span class="text-purple-500 mx-1"
          ><NuxtLink to="/forgotpassword">دریافت رمز</NuxtLink></span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth",
});

useHead({
  title: "ورود",
  meta: [
    {
      name: "description",
      content:
        "فقط در چند ثانیه کپشن های حرفه ای بسازید و راه خودتون رو برای رسیدن به اکسپلور و دیده شدن هموار کنید",
    },
    {
      property: "og:title",
      content:
        "کپشن‌ساز — تولید کپشن برای نمایش در اکسپلور اینستاگرام و سایر شبکه های مجازی",
    },
    {
      property: "og:description",
      content:
        "کپشن‌ساز به شما کمک می‌کند کپشن‌های جذاب و ترند بسازید تا پست‌های شما مخاطب بیشتری جذب کنند.",
    },
    { property: "og:url", content: "https://captionsaz.ir/login" },
  ],
  link: [{ rel: "canonical", href: "https://captionsaz.ir/login" }],
});
</script>
