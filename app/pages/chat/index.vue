<template>
  <div class="w-full flex items-center max-h-[79vh] flex-col">
    <!-- Chat box -->
    <div class="w-full max-h-4/7 overflow-y-scroll px-2 py-1">
      <ChatBubble
        v-for="(message, index) in messages"
        :key="index"
        :message="message"
        class="mb-6"
      />
    </div>
    <!-- Buttons and input Selector -->
    <div
      class="w-full border-t max-h-1/2 border-gray-500 p-2 overflow-y-scroll flex flex-col"
    >
      <ToneSelector class="w-full h-full" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "chat",
});

const messages = ref([
  {
    id: 1,
    text: "سلام من کپشن ساز هستم چطور میتونم کمکت کنم ,",
    isUser: false,
  },
  { id: 1, text: "میخوام یه پست راحع به افتتاحیه کافم بزنم", isUser: true },
  { id: 1, text: "عالیه پس بریم بسازیمش", isUser: false },
  { id: 1, text: "عالیه پس بریم بسازیمش", isUser: true },
  { id: 1, text: "عالیه پس بریم بسازیمش", isUser: false },
  { id: 1, text: "عالیه پس بریم بسازیمش", isUser: true },
]);
</script>
