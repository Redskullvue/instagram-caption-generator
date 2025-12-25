<template>
  <div class="w-full h-full flex justify-center">
    <div class="w-full 2xl:w-[90%] h-full">
      <ClientOnly>
        <div
          class="w-full grid grid-cols-1 lg:grid-cols-4 gap-x-4 gap-y-5 mt-4"
        >
          <ScheduleMetadataBox
            v-for="(box, index) in metaDataBoxes"
            :key="index"
            :title="box.title"
            :icon="box.icon"
            :value="box.value"
          />
        </div>
      </ClientOnly>

      <!-- Plan Cards -->
      <ClientOnly>
        <div class="w-full grid grid-cols-1 lg:grid-cols-4 mt-15 gap-4">
          <template v-for="(plan, index) in planStore.allPlans" :key="index">
            <SchedulesListCard
              :plan-information="plan"
              :color="randomColor()"
            />
          </template>
          <div
            v-if="planStore.allPlans.length <= 0"
            class="flex items-center justify-center flex-col gap-y-4 col-span-4"
          >
            <p class="w-full text-center">هنوز برنامه ای ایجاد نشده</p>
            <NuxtLink
              to="/chat"
              class="rounded-xl bg-purple-500 py-2 px-4 text-white flex items-center gap-x-1"
            >
              ایجاد برنامه
              <Icon name="ic:outline-plus" size="24px" />
            </NuxtLink>
          </div>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "schedules",
  middleware: "auth",
});

const planStore = usePlanStore();
const metaDataBoxes = [
  {
    title: "کل کار ها",
    icon: "ant-design:rise-outlined",
    value: planStore.totalPostsEver,
  },
  {
    title: "کل استوری ها",
    icon: "streamline-sharp:story-post",
    value: planStore.totalStoriesEver,
  },
  {
    title: "برنامه ها",
    icon: "uil:calender",
    value: planStore.allPlans.length,
  },
  {
    title: "تکمیل شده ها",
    icon: "lets-icons:done-ring-round",
    value: planStore.completedPlans,
  },
];
// This section is to assign random colors to each plan header for better UX
const colors = ref(["purple", "yellow", "green", "red", "blue"]);
const randomColor = () => {
  const selectedColor =
    colors.value[Math.floor(Math.random() * colors.value.length)];
  return selectedColor;
};
</script>
