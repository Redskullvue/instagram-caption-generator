<template>
  <div class="w-full h-full flex justify-center">
    <div class="w-full 2xl:w-[90%] h-full">
      <ClientOnly>
        <div
          class="w-full grid grid-cols-1 lg:grid-cols-4 gap-x-4 gap-y-5 mt-4"
        >
          <ScheduleMetadataBox
            v-for="(box, index) in ticketBoxes"
            :key="index"
            :title="box.title"
            :icon="box.icon"
            :value="box.value"
          />
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
  layout: "ticket",
});

const ticketBoxes = computed(() => [
  {
    title: "کل تیکت ها",
    icon: "ant-design:rise-outlined",
    value: 10,
  },
  {
    title: "تیکت های باز",
    icon: "majesticons:open",
    value: 1,
  },
  {
    title: "درحال بررسی",
    icon: "mdi:progress-clock",
    value: 2,
  },
  {
    title: "  بسته شده",
    icon: "lets-icons:done-ring-round",
    value: 7,
  },
]);
</script>
