<template>
  <div
    class="w-full flex flex-col justify-between py-3 lg:px-10 max-h-20 bg-white shadow-md shadow-gray-500 min-h-max"
  >
    <div class="flex w-full items-center justify-between">
      <div class="lg:mx-4 flex items-center w-full lg:w-max">
        <img
          class="max-w-[75px] max-h-[75px]"
          src="/logo.png"
          alt="لوگو-کپشن ساز"
        />
        <h1 class="font-bold">کپشن ساز</h1>
      </div>
      <div>
        <p class="lg:text-sm text-gray-500 w-full text-xs">
          © 2025 کپشن ساز. تمامی حقوق محفوظ است.
        </p>
      </div>
    </div>
    <div
      class="w-full px-10 mt-4 flex gap-x-7 items-center justify-center lg:justify-start"
    >
      <NuxtLink to="/about">درباره ما</NuxtLink>
      <NuxtLink to="/pricing">قیمت ها</NuxtLink>
    </div>
  </div>
</template>

<script setup></script>
