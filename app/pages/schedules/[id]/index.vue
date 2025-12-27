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
        <div class="w-full">
          <h2 class="text-lg">خلاصه برنامه هفتگی</h2>
          <p class="text-xs text-gray-500 mt-1">تحلیل و آمار محتوای هفته</p>
        </div>
        <div class="lg:w-full flex items-center justify-end">
          <NuxtLink
            to="/schedules"
            class="bg-purple-400 py-2 px-4 rounded-xl text-sm text-white transition-colors duration-300 hover:bg-purple-500"
            >بازگشت</NuxtLink
          >
        </div>
      </div>
      <!-- The Main Data -->
      <div class="w-full grid lg:grid-cols-4 grid-cols-1 gap-x-4 mt-10 gap-y-4">
        <template v-for="(box, index) in metaDataBoxes" :key="index">
          <ScheduleMetadataBox
            :icon="box.icon"
            :title="box.title"
            :value="box.value"
          />
        </template>
      </div>
      <!-- Hashtags -->
      <div class="w-full mt-4">
        <ScheduleHashtagBox :hashtags="planStore.currentPlanHashtagList" />
      </div>
      <!-- Days of the Week -->
      <div class="w-full mt-8 flex flex-col gap-y-3">
        <div class="w-full">محتوای هفته جاری</div>
        <div class="flex flex-col items-center justify-center w-full gap-y-4">
          <template v-for="i in 7" :key="i">
            <ScheduleDayBox v-if="plan" :data="planStore.taskSorter(i)" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth", "schedule"],
});
const route = useRoute();
const planStore = usePlanStore();
const toastStore = useToastStore();
const plan = ref(null);

onMounted(async () => {
  try {
    await planStore.getSinglePlan(route.params.id);
    plan.value = { ...planStore.currentPlan };
  } catch (error) {
    toastStore.addToast("error", error.message);
  }
});
const metaDataBoxes = computed(() => [
  {
    title: "ریلز ها",
    icon: "mingcute:video-line",
    value: plan.value?.summary?.contentTypesDistribution?.reels ?? 0,
  },
  {
    title: "استوری ها",
    icon: "streamline-sharp:story-post",
    value: plan.value?.summary?.contentTypesDistribution?.story ?? 0,
  },
  {
    title: "اولویت بالا",
    icon: "hugeicons:important-book",
    value: planStore.currentPlanHighPriorityList,
  },
  {
    title: "پست ها",
    icon: "mdi:post-outline",
    value: plan.value?.summary?.contentTypesDistribution?.video ?? 0,
  },
]);
</script>
