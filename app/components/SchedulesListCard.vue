<template>
  <div class="w-full h-full rounded-xl bg-white">
    <!-- Header Of Card -->
    <div
      class="w-full text-white p-4 rounded-t-xl flex items-center justify-between relative"
      :class="'bg-' + color + '-500'"
    >
      <!-- Title of Header -->
      <div class="w-full">
        <p>{{ planInformation.title.substring(0, 20) }}...</p>
        <p class="text-xs mt-1">
          با تمرکز بر {{ planInformation.keyFocus.substring(0, 25) }}
          <span v-if="planInformation.keyFocus?.length >= 26">...</span>
        </p>
      </div>

      <!-- More Options Button -->
      <button
        @click="showMenu = !showMenu"
        class="p-2 flex items-center justify-center rounded-xl cursor-pointer transition-colors duration-300 hover:opacity-85"
        :class="'bg-' + color + '-400'"
      >
        <Icon name="nrk:more" size="25px" />
      </button>

      <div
        v-show="showMenu"
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
          {{ planInformation.totalPosts }} کار
        </div>
        <div class="flex items-center gap-x-1 text-gray-500">
          <Icon name="streamline-sharp:story-post" size="20px" />
          {{ planInformation.contentType?.story }} استوری
        </div>
      </div>
      <div class="w-full flex flex-col mt-10 mb-10">
        <div
          class="w-full flex items-center justify-between text-sm text-gray-500"
        >
          <p>پیشرفت</p>
          <p>{{ remainingPercentage }} %</p>
        </div>
        <!-- ProgressBar -->
        <div class="w-full rounded-xl bg-gray-200 mt-3 h-1 mb-2">
          <div
            class="rounded-xl h-full"
            :class="'bg-' + color + '-400'"
            :style="{ width: remainingPercentage + '%' }"
          ></div>
        </div>
        <div
          class="w-full flex items-center justify-between text-gray-500 text-xs"
        >
          <p>{{ planInformation.completedPosts }} عدد انجام شده</p>
          <p>
            {{ planInformation.totalPosts - planInformation.completedPosts }}
            عدد باقی مانده
          </p>
        </div>
      </div>
      <!-- Created Date -->
      <div class="w-full text-xs text-gray-500 mb-8">
        ایجاد شده در تاریخ :
        <span>{{ formatDate(planInformation.createdAt) }}</span>
      </div>
      <!-- Action buttons -->
      <div class="w-full flex justify-between gap-x-4 text-sm h-full items-end">
        <NuxtLink
          :to="'/schedules/' + planInformation.id"
          class="rounded-xl py-2 text-white px-3 transition-all duration-300 hover:opacity-70 flex items-center gap-x-1"
          :class="'bg-' + color + '-500'"
        >
          <Icon name="mdi:eye-outline" size="20px" />
          مشاهده جزییات
        </NuxtLink>
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
const props = defineProps({
  planInformation: {
    type: Object,
    required: true,
  },
  color: {
    type: String,
    default: "purple",
  },
});
const { formatDate } = useDateChanger();

const remainingPercentage = computed(() =>
  Math.floor(
    (props.planInformation.completedPosts / props.planInformation.totalPosts) *
      100
  )
);
const showMenu = ref(false);
</script>
