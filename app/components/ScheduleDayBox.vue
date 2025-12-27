<template>
  <div
    class="w-full rounded-xl text-white bg-linear-to-r overflow-hidden from-purple-600 to-pink-500 flex flex-col items-start cursor-pointer transition-all duration-300 hover:opacity-85"
    :class="showInformation ? ' max-h-[1000px]' : 'max-h-20'"
    @click="toggleBox"
  >
    <div class="w-full flex items-center gap-x-4 p-3">
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
      class="w-full bg-white h-full mt-4 rounded-br-xl rounded-bl-xl shadow-md shadow-gray-300 p-3"
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
          </div>
        </div>
        <!-- Take Action Buttons -->
        <div
          class="w-full flex items-center gap-x-4 mt-6 flex-wrap justify-center lg:justify-start gap-y-3"
        >
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

          <button
            class="rounded-xl border border-purple-500 w-[250px] py-3 cursor-pointer transition-colors duration-300 hover:bg-purple-500 hover:text-white"
          >
            تولید سناریو
          </button>

          <button
            class="rounded-xl border border-pink-500 w-[250px] py-3 cursor-pointer transition-colors duration-300 hover:bg-pink-500 hover:text-white"
          >
            اتمام کار
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["data"]);
const showInformation = ref(false);
const toggleBox = () => {
  showInformation.value = !showInformation.value;
};
</script>

<style lang="scss" scoped></style>
