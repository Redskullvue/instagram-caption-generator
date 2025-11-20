<template>
  <div class="w-full flex items-center max-h-[79vh] flex-col">
    <!-- Chat box -->
    <div class="w-full max-h-4/7 min-h-[50vh] overflow-y-scroll px-2 py-1">
      <ChatBubble
        v-for="(message, index) in messages"
        :key="index"
        :message="message"
        class="mb-6"
      />
      <TypingIndicator v-if="isGenerating === true" />
    </div>
    <!-- Buttons and input Selector -->
    <div
      class="w-full border-t max-h-1/2 border-gray-500 p-2 overflow-y-scroll flex flex-col"
    >
      <ToneSelector class="w-full h-full" @selectTone="setTone" />
      <InputBar class="w-full h-full" @generate="sendMessage" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "chat",
});
const selectedTone = ref("");
const isGenerating = ref(false);
const messages = ref([
  {
    id: 1,
    text: "سلام من کپشن ساز هستم چطور میتونم کمکت کتم ؟",
    isUser: false,
  },
]);

const sendMessage = (val) => {
  messages.value.push({
    id: messages.value.length + 1,
    text: val,
    isUser: true,
  });
  generateCaption();
};

const setTone = (val) => {
  selectedTone.value = val;
};
const generateCaption = async () => {
  isGenerating.value = true;
  setTimeout(() => {
    messages.value.push({ id: 2, text: "اکی دارم انجامش میدم", isUser: false });
    isGenerating.value = false;
  }, 1000);
};
</script>
