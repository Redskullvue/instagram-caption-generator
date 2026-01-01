<template>
  <div
    class="w-ful grid grid-cols-1 lg:grid-cols-3 py-3 lg:px-10 max-h-20 bg-white shadow-md shadow-gray-500 min-h-max"
  >
    <div
      class="lg:mx-4 flex items-center justify-center pl-10 mb-4 lg:mb-0 w-full lg:w-max"
    >
      <img
        class="max-w-[70px] max-h-[70px]"
        src="/logo.png"
        alt="لوگو-کپشن ساز"
      />
      <h1 class="font-bold">کپشن ساز</h1>
    </div>

    <div
      class="w-full px-10 flex gap-x-7 items-center justify-center text-purple-600 mb-4 lg:mb-0"
    >
      <NuxtLink to="/about">درباره ما</NuxtLink>
      <NuxtLink to="/pricing">قیمت ها</NuxtLink>
      <NuxtLink to="/contact-us">تماس با ما</NuxtLink>
      <NuxtLink to="/blog">وبلاگ</NuxtLink>
    </div>
    <div class="flex items-center justify-center">
      <a
        referrerpolicy="origin"
        target="_blank"
        href="https://trustseal.enamad.ir/?id=682141&Code=XKxJIQEhpAM4C0tMRXzgSLQZPXOeC9yA"
        ><img
          referrerpolicy="origin"
          src="https://trustseal.enamad.ir/logo.aspx?id=682141&Code=XKxJIQEhpAM4C0tMRXzgSLQZPXOeC9yA"
          alt=""
          style="cursor: pointer"
          code="XKxJIQEhpAM4C0tMRXzgSLQZPXOeC9yA"
      /></a>
    </div>
  </div>
  <div class="bg-white flex items-center justify-center w-full">
    <p
      class="lg:text-sm text-gray-500 w-full flex items-center justify-center text-xs pr-6"
    >
      © 2025 کپشن ساز. تمامی حقوق محفوظ است.
    </p>
  </div>
</template>

<script setup></script>
