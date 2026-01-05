<template>
  <div
    class="w-full rounded-xl text-white bg-linear-to-r overflow-hidden from-purple-600 to-pink-500 flex flex-col items-start cursor-pointer transition-all duration-300 hover:opacity-85"
    :class="showInformation ? ' max-h-[1000px]' : 'max-h-20'"
  >
    <div class="w-full flex items-center gap-x-4 p-3" @click="toggleBox">
      <div class="bg-pink-400 p-2 flex items-center justify-center rounded-xl">
        <Icon name="uil:calender" size="35px" />
      </div>
      <div class="flex flex-col gap-y-2 w-full">
        <p>{{ data[0]?.day || "امروز روز استراحته" }}</p>
        <p class="text-xs">روز {{ data[0]?.dayNumber || "بدون محتوا" }}</p>
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
      class="w-full bg-white h-full mt-4 rounded-br-xl rounded-bl-xl shadow-md shadow-gray-300 p-3 overflow-y-scroll"
    >
      <div
        class="w-full rounded-xl border border-dashed border-purple-300 h-max mt-1 flex flex-col gap-y-3 text-gray-700 p-4 my-2"
        v-for="task in data"
        :key="task.id"
      >
        <!-- Title And Priority -->
        <div class="w-full flex items-center">
          <div class="w-full">
            <p>✨ {{ task.title }}</p>
            <p class="text-sm mt-3 mr-2">
              {{ task.description }}
            </p>
          </div>
          <!-- Priority Tag -->
          <div class="flex items-center justify-center">
            <Tag
              :text="
                task.priority === 'high'
                  ? 'بالا'
                  : task.priority === 'medium'
                  ? 'متوسط'
                  : 'کم'
              "
              :color="
                task.priority === 'high'
                  ? 'red'
                  : task.priority === 'medium'
                  ? 'yellow'
                  : 'blue'
              "
            />
          </div>
        </div>
        <!-- Content Inforation -->
        <div
          class="w-full grid grid-cols-1 md:grid-cols-2 mr-2 mt-6 gap-y-4 text-gray-500"
        >
          <div>
            نوع :
            <span class="text-purple-600 font-bold">{{
              task.contentType
            }}</span>
          </div>
          <div>
            زمان انتشار :
            <span class="text-purple-600 font-bold">{{
              task.estimatedTime
            }}</span>
          </div>
          <div>
            دسته بندی :
            <span class="text-purple-600 font-bold">{{ task.category }}</span>
          </div>
          <div>
            هشتگ ها :
            <span
              class="text-purple-600 font-bold"
              v-for="(hashtag, index) in task.hashtags"
              :key="index"
            >
              #{{ hashtag }}
            </span>
            <span v-if="task.hashtags.length <= 0">هشنگی پیشنهاد نشده</span>
          </div>
        </div>
        <!-- Take Action Buttons -->
        <div
          class="w-full flex items-center gap-x-4 mt-6 flex-wrap justify-center lg:justify-start gap-y-3"
        >
          <button
            @click="generateImageFromSchedule(task.title, task.description)"
            :disabled="generateStore.isGenerating"
            class="rounded-xl border border-purple-500 disabled:opacity-80 w-[250px] py-3 cursor-pointer transition-colors duration-300 hover:bg-purple-500 hover:text-white"
          >
            <p v-if="!generateStore.isGenerating">تولید عکس پست</p>
            <p v-else>درحال تولید</p>
          </button>
          <button
            @click="generateCaptionFromSchedule(task.title, task.description)"
            :disabled="generateStore.isGenerating"
            class="rounded-xl border border-pink-500 w-[250px] disabled:opacity-80 py-3 cursor-pointer transition-colors duration-300 hover:bg-pink-500 hover:text-white"
          >
            <p v-if="!generateStore.isGenerating">تولید کپشن</p>
            <p v-else>درحال تولید</p>
          </button>

          <button
            :disabled="generateStore.isGenerating"
            class="rounded-xl border border-purple-500 disabled:opacity-80 w-[250px] py-3 cursor-pointer transition-colors duration-300 hover:bg-purple-500 hover:text-white"
          >
            <p v-if="!generateStore.isGenerating">تولید سناریو</p>
            <p v-else>درحال تولید</p>
          </button>

          <button
            @click="setStatus(route.params.id, task.id, true)"
            :disabled="task.completed"
            class="rounded-xl border border-pink-500 w-[250px] py-3 cursor-pointer transition-colors duration-300 hover:bg-pink-500 hover:text-white disabled:opacity-40"
          >
            <p v-if="!task.completed">پایان</p>
            <p v-else>پایان یافته</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["data"]);
const showInformation = ref(false);
const planStore = usePlanStore();
const generateStore = useGenerateStore();
const route = useRoute();
const toggleBox = () => {
  showInformation.value = !showInformation.value;
};

const setStatus = (planId, scheduleId, status) => {
  planStore.updateTaskStatus(planId, scheduleId, status);
};

const generateImageFromSchedule = async (title, description) => {
  const input = `تیتر : ${title ?? ""}
  توضیحات: ${description ?? ""} 
  این عکس باید برای فضای مجازی ساخته شود
  `;
  try {
    await generateStore.generateImage(input);
  } catch (error) {
    console.log(error);
  } finally {
    navigateTo("/chat");
  }
};

const generateCaptionFromSchedule = async (title, description) => {
  const input = `این پست برای اینستاگرامه و هدفش رسیدن به اکسپلوره
  موضوع : ${title}, توضیحات : ${description}
  `;

  try {
    await generateStore.generateCaption(input);
  } catch (error) {
    console.log(error);
  } finally {
    navigateTo("/chat");
  }
};
</script>

<style lang="scss" scoped></style>
