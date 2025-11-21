<template>
  <div class="w-full flex items-center max-h-[79vh] flex-col">
    <!-- Chat box -->
    <div
      class="w-full lg:max-h-[55vh] lg:min-h-[55vh] min-h-[50vh] max-h-[50vh] overflow-y-scroll px-2 py-1"
      ref="chatContainer"
    >
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
      class="w-full border-t max-h-1/2 border-gray-500 p-2 overflow-y-scroll lg:overflow-y-hidden flex flex-col"
    >
      <ToneSelector
        class="w-full h-full lg:max-w-[300px] lg:absolute lg:right-4 lg:top-[100px] lg:bg-white lg:rounded-xl lg:p-4"
        @selectTone="setTone"
      />
      <InputBar
        class="w-full h-full mt-4 lg:mt-0"
        @generate="sendMessage"
        :isGenerating="isGenerating"
      />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "chat",
  middleware: "auth",
});
const selectedTone = ref("");
const isGenerating = ref(false);
// This composable set the scroll to the end of chat box
const { chatContainer, onMessageAdded } = useChatScroll();

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
  onMessageAdded();
};

const setTone = (val) => {
  selectedTone.value = val;
};
const generateCaption = async () => {
  isGenerating.value = true;
  setTimeout(() => {
    messages.value.push({ id: 2, text: "اکی دارم انجامش میدم", isUser: false });
    isGenerating.value = false;
    onMessageAdded();
  }, 1000);
};
</script>
