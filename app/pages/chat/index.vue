<template>
  <div class="w-full flex items-center max-h-[79vh] flex-col">
    <!-- Chat box -->
    <div class="w-full max-h-4/7 min-h-[300px] overflow-y-scroll px-2 py-1">
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
      <ToneSelector class="w-full h-full" @selectTone="setTone" />
      <InputBar class="w-full h-full" @generate="generateCaption" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "chat",
});
const selectedTone = ref("");
const messages = ref([
  {
    id: 1,
    text: "سلام من کپشن ساز هستم چطور میتونم کمکت کتم ؟",
    isUser: false,
  },
]);

const generateCaption = (val) => {
  messages.value.push({
    id: messages.value.length + 1,
    text: val,
    isUser: true,
  });
};

const setTone = (val) => {
  selectedTone.value = val;
};
</script>
