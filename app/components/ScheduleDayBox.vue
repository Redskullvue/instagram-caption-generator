<template>
  <div
    class="w-full rounded-xl text-white bg-linear-to-r overflow-hidden from-purple-600 to-pink-500 flex flex-col items-start cursor-pointer transition-all duration-300 hover:opacity-85"
    :class="showInformation ? 'h-[400px]' : 'h-20'"
    @click="toggleBox"
  >
    <div class="w-full flex items-center gap-x-4 p-3">
      <div class="bg-pink-400 p-2 flex items-center justify-center rounded-xl">
        <Icon name="uil:calender" size="35px" />
      </div>
      <div class="flex flex-col gap-y-2 w-full">
        <p>شنبه</p>
        <p class="text-xs">روز اول</p>
      </div>
      <div class="flex items-center justify-center font-bold mt-1">
        <Icon
          name="mdi-light:chevron-down"
          size="32px"
          :class="showInformation ? 'rotate-180' : 'rotate-0'"
        />
      </div>
    </div>

    <div
      class="w-full bg-white h-full mt-4 rounded-br-xl rounded-bl-xl shadow-md shadow-gray-300 p-3"
    >
      <div
        class="w-full rounded-xl border border-dashed border-purple-300 h-max mt-1 flex flex-col gap-y-3 text-gray-700 p-4"
      >
        <!-- Title And Priority -->
        <div class="w-full flex items-center">
          <div class="w-full">
            <p>✨ نکات طلایی کپشن نویسی</p>
            <p class="text-sm mt-3 mr-2">
              ۵ نکته حرفه‌ای برای نوشتن کپشن‌های جذاب که فالوورهایت را متحول
              می‌کند
            </p>
          </div>
          <!-- Priority Tag -->
          <div class="flex items-center justify-center">
            <div
              class="text-red-600 bg-red-100 px-4 py-2 text-xs border border-red-400 rounded-xl"
            >
              بالا
            </div>
          </div>
        </div>
        <!-- Content Inforation -->
        <div class="w-full grid grid-cols-2 mr-2 mt-6 gap-y-4 text-gray-500">
          <div>
            نوع :
            <span class="text-purple-600 font-bold">پست</span>
          </div>
          <div>
            زمان انتشار :
            <span class="text-purple-600 font-bold">20:30</span>
          </div>
          <div>
            دسته بندی :
            <span class="text-purple-600 font-bold">ترفندها</span>
          </div>
          <div>
            هشتگ ها :
            <span class="text-purple-600 font-bold"># تست # تست </span>
          </div>
        </div>
        <!-- Take Action Buttons -->
        <div class="w-full flex items-center gap-x-4 mt-6">
          <button
            class="rounded-xl border border-purple-500 w-[250px] py-3 cursor-pointer transition-colors duration-300 hover:bg-purple-500 hover:text-white"
          >
            تولید عکس پست
          </button>
          <button
            class="rounded-xl border border-pink-500 w-[250px] py-3 cursor-pointer transition-colors duration-300 hover:bg-pink-500 hover:text-white"
          >
            تولید کپشن
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const showInformation = ref(false);

const toggleBox = () => {
  showInformation.value = !showInformation.value;
};
</script>

<style lang="scss" scoped></style>
