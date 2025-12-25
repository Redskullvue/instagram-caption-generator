<template>
  <div class="w-full h-full rounded-xl bg-white">
    <!-- Header Of Card -->
    <div
      class="w-full bg-purple-500 text-white p-4 rounded-t-xl flex items-center justify-between relative"
    >
      <!-- Title of Header -->
      <div class="w-full">
        <p>برنامه محتوای اسفند ۱۴۰۳</p>
        <p class="text-xs mt-1">
          برنامه کامل محتوای ماه اسفند با تمرکز بر کمپین نوروزی
        </p>
      </div>

      <!-- More Options Button -->
      <button
        @click="showMenu = !showMenu"
        class="p-2 flex items-center justify-center bg-purple-400 rounded-xl cursor-pointer transition-colors duration-300 hover:bg-purple-300"
      >
        <Icon name="nrk:more" size="25px" />
      </button>

      <div
        v-if="showMenu"
        class="w-[150px] h-[150px] rounded-xl bg-white flex justify-center shadow-md p-3 shadow-gray-300 left-4 absolute top-[75%] z-50"
      >
        <button
          class="text-red-500 h-max w-full text-start text-sm border-b border-gray-300 p-1 items-center flex gap-x-2"
        >
          <Icon name="line-md:trash" size="20px" />
          حذف
        </button>
      </div>
    </div>
    <!-- Body Of the Card -->
    <div
      class="bg-white w-full rounded-b-xl h-[350px] flex flex-col items-center 2xl:p-5 p-3"
    >
      <div class="w-full flex items-center justify-between text-sm">
        <div>
          <Tag text="پایان" color="blue" />
        </div>
        <div class="flex items-center gap-x-1 text-gray-500">
          <Icon name="ant-design:rise-outlined" size="20px" />
          10 پست
        </div>
        <div class="flex items-center gap-x-1 text-gray-500">
          <Icon name="streamline-sharp:story-post" size="20px" />
          10 آستوری
        </div>
      </div>
      <div class="w-full flex flex-col mt-10 mb-10">
        <div
          class="w-full flex items-center justify-between text-sm text-gray-500"
        >
          <p>پیشرفت</p>
          <p>67%</p>
        </div>
        <!-- ProgressBar -->
        <div class="w-full rounded-xl bg-gray-200 mt-3 h-1 mb-2">
          <div class="w-[67%] rounded-xl h-full bg-green-400"></div>
        </div>
        <div
          class="w-full flex items-center justify-between text-gray-500 text-xs"
        >
          <p>8 عدد انجام شده</p>
          <p>4 عدد باقی مانده</p>
        </div>
      </div>
      <!-- Created Date -->
      <div class="w-full text-xs text-gray-500 mb-8">
        ایجاد شده در تاریخ : <span>04/12/1404</span>
      </div>
      <!-- Action buttons -->
      <div class="w-full flex items-center justify-between gap-x-4 text-sm">
        <NuxtLink
          to="/schedule"
          class="rounded-xl py-2 text-white bg-purple-500 px-3 transition-colors duration-300 hover:bg-purple-400"
          >مشاهده جزییات</NuxtLink
        >
        <button
          class="border boder-gray-300 border-dashed px-3 py-2 rounded-xl"
        >
          پرینت برنامه
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const showMenu = ref(false);
</script>
