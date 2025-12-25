<template>
  <div class="w-full h-full flex justify-center">
    <div class="w-full 2xl:w-[90%] h-full">
      <div class="w-full grid grid-cols-1 lg:grid-cols-4 gap-x-4 gap-y-5 mt-4">
        <ScheduleMetadataBox
          v-for="i in 4"
          :key="i"
          icon="fluent-color:calendar-data-bar-28"
          title="کل پست ها"
          value="10"
        />
      </div>
      <!-- Plan Cards -->
      <div class="w-full grid grid-cols-1 lg:grid-cols-4 mt-15 gap-4">
        <SchedulesListCard v-for="i in 4" :key="i" />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "schedules",
  middleware: "auth",
});
</script>
