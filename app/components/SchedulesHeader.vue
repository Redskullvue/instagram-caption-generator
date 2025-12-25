<template>
  <div class="w-full min-h-[170px] bg-white flex flex-col 2xl:p-10 p-3">
    <!-- Title -->
    <div class="w-full flex items-center gap-x-4">
      <!-- Icon -->
      <div
        class="bg-linear-to-r from-purple-600 to-pink-600 rounded-xl w-max h-max p-1 flex items-center justify-center"
      >
        <Icon
          name="hugeicons:analytics-03"
          size="40px"
          class="text-purple-100"
        />
      </div>
      <!-- Text -->
      <div class="w-full flex flex-col gap-y-2">
        <p>برنامه‌های محتوایی من</p>
        <p class="text-gray-600 text-xs">مدیریت و مشاهده تمام برنامه‌ها</p>
      </div>
      <NuxtLink
        to="/chat"
        class="2xl:w-[200px] w-[190px] rounded-xl text-center 2xl:py-4 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-sm text-white"
      >
        برگشت به چت
      </NuxtLink>
    </div>
    <!-- Search Input -->
    <div class="w-full mt-5">
      <SchedulesSearch class="w-full lg:max-w-[80%]" />
    </div>
  </div>
</template>

<script setup></script>
