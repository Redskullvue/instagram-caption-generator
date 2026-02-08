<template>
  <div class="w-full min-h-[170px] bg-white flex flex-col 2xl:p-10 p-3">
    <!-- Title -->
    <div class="w-full flex items-center gap-x-4">
      <!-- Icon -->
      <div
        class="bg-linear-to-r from-purple-600 to-pink-600 rounded-xl w-max h-max p-2 flex items-center justify-center"
      >
        <Icon name="bx:support" size="40px" class="text-purple-100" />
      </div>
      <!-- Text -->
      <div class="w-full flex flex-col gap-y-2">
        <p>پشتیبانی</p>
        <p class="text-gray-600 text-xs">
          مدیریت و مشاهده تمام تیکت های ارسال شده
        </p>
      </div>
      <div class="flex flex-col gap-y-3">
        <NuxtLink
          to="/chat"
          class="2xl:w-[200px] w-[150px] rounded-xl text-center 2xl:py-4 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-sm text-white"
        >
          برگشت به چت
        </NuxtLink>
        <NuxtLink
          to="/support/new"
          class="rounded-xl border border-dashed text-sm border-purple-400 py-3 2xl:w-[200px] w-[150px] text-purple-500 2xl:py-4 text-center flex items-center justify-center gap-x-1 transition-colors duration-300 hover:bg-purple-400 hover:text-white"
        >
          <Icon name="ic:outline-plus" size="20px" />
          تیکت جدید
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup></script>
