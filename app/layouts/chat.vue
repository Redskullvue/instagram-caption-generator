<template>
  <div class="w-full h-screen flex justify-center items-center">
    <div
      class="w-full flex justify-start min-h-screen h-screen flex-col p-1 bg-linear-to-r from-purple-600 to-pink-600"
    >
      <div
        class="w-full bg-linear-to-r from-purple-600 to-pink-600 min-h-[90px] flex items-center rounded-tr-xl flex-col rounded-tl-xl p-4"
      >
        <div class="w-full text-white flex items-center gap-x-2">
          <Icon name="mingcute:ai-fill" size="30px" />
          <h2 class="font-bold">کپشن ساز</h2>
        </div>
        <p class="text-sm text-white w-full text-start mt-2">
          در چند ثانیه کپشن جذاب بسازید
        </p>
      </div>
      <div
        class="w-full lg:flex lg:justify-center h-full bg-linear-to-r from-purple-600 to-pink-600 p-1"
      >
        <div
          class="w-full lg:w-6/12 bg-white lg:shadow-md shadow-gray-500 rounded-lg lg:rounded-xl h-full py-4 px-2"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
