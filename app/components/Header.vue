<template>
  <div
    class="w-full flex items-center justify-between p-4 max-h-20 bg-white shadow-md shadow-gray-500"
  >
    <div class="mx-4 flex items-center">
      <NuxtLink class="flex items-center" to="/">
        <img
          class="max-w-[75px] max-h-[75px]"
          src="/logo.png"
          alt="لوگو-کپشن ساز"
        />
        <h1 class="font-bold">کپشن ساز</h1>
      </NuxtLink>
    </div>
    <div>
      <NuxtLink
        to="/chat"
        class="py-2 px-4 bg-linear-to-r from-purple-600 to-pink-600 rounded-xl text-white mx-4 transition-all duration-300 hover:opacity-70"
      >
        شروع رایگان
      </NuxtLink>
    </div>
  </div>
</template>

<script setup></script>
