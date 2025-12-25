<template>
  <div class="w-full rounded-xl bg-white p-3 flex flex-col gap-y-3">
    <div class="flex items-center gap-x-2">
      <Icon name="mingcute:ai-line" size="25px" class="text-purple-500" />
      <p>هشتگ های مرتبط</p>
    </div>
    <div class="w-full flex gap-x-3 flex-wrap">
      <div
        class="bg-purple-400 rounded-xl py-1 px-3 text-white hover:bg-purple-500 transition-colors duration-300 cursor-pointer"
        v-for="(hashtag, index) in hashtags"
        :key="index"
      >
        # {{ hashtag }}
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["hashtags"]);
</script>
