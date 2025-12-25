<template>
  <div class="w-full bg-pink-50 min-h-screen p-3 2xl:p-10 flex justify-center">
    <div class="w-full flex flex-col items-center p-4 2xl:w-[99%]">
      <div class="w-full flex items-center gap-x-3">
        <div
          class="bg-linear-to-r from-purple-600 to-pink-600 rounded-xl w-max h-max p-1 flex items-center justify-center"
        >
          <Icon
            name="hugeicons:analytics-03"
            size="45px"
            class="text-purple-100"
          />
        </div>
        <div>
          <h2 class="text-lg">خلاصه برنامه هفتگی</h2>
          <p class="text-xs text-gray-500 mt-1">تحلیل و آمار محتوای هفته</p>
        </div>
      </div>
      <!-- The Main Data -->
      <div class="w-full grid lg:grid-cols-4 grid-cols-1 gap-x-4 mt-10 gap-y-4">
        <ScheduleMetadataBox
          v-for="i in 4"
          :key="i"
          icon="fluent-color:calendar-data-bar-28"
          title="کل پست ها"
          value="10"
        />
      </div>
      <!-- Hashtags -->
      <div class="w-full mt-4">
        <ScheduleHashtagBox :hashtags="['test', 'test2', 'test3', 'تست4']" />
      </div>
      <!-- Days of the Week -->
      <div class="w-full mt-8 flex flex-col gap-y-3">
        <div class="w-full">محتوای هفته جاری</div>
        <div class="flex flex-col items-center justify-center w-full gap-y-4">
          <ScheduleDayBox v-for="i in 7" :key="i" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
</script>

<style lang="scss" scoped></style>
