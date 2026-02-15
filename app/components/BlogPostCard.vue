<template>
  <div
    class="w-full rounded-xl bg-white p-4 flex items-center flex-col shadow-md shadow-gray-300"
  >
    <!-- Image -->
    <div>
      <img
        :src="post.image"
        alt="Blog Image"
        class="max-w-[300px] rounded-xl min-h-[300px]"
      />
    </div>
    <!-- Title And Desctiption -->
    <div class="w-full mt-6 p-4">
      <p class="font-bold text-lg min-h-[90px]">{{ post.title }}</p>
      <p class="text-gray-600 mt-4 text-sm max-w-[40ch] min-h-[100px]">
        {{ post.description }}
      </p>
    </div>
    <!-- More.. Button -->
    <div class="mt-4 w-full flex items-center justify-end">
      <NuxtLink
        :to="post.link"
        class="text-white rounded-xl bg-purple-500 py-2 px-4 transition-colors duration-300 hover:bg-purple-600 cursor-pointer text-sm"
        >ادامه مطالب</NuxtLink
      >
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});
</script>
