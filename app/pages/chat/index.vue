<template>
  <div class="w-full flex items-center max-h-[79vh] flex-col">
    <!-- Chat box -->
    <div
      class="w-full lg:max-h-[55vh] lg:min-h-[55vh] min-h-[50vh] max-h-[50vh] overflow-y-scroll px-2 py-1"
      ref="chatContainer"
    >
      <template v-for="(message, index) in messages" :key="index">
        <ChatBubble :message="message" class="mb-6" />
        <CopyButton
          v-if="!message.isUser && index !== 0"
          class="-mt-2 w-full text-end pl-4"
          :message="message.text"
        />
      </template>
      <TypingIndicator v-if="isGenerating === true" />
    </div>
    <!-- Buttons and input Selector -->
    <div
      class="w-full border-t max-h-1/2 border-gray-500 p-2 overflow-y-scroll lg:overflow-y-hidden flex flex-col lg:min-h-[28vh]"
    >
      <ToneSelector
        class="w-full h-full lg:max-w-[300px] lg:absolute lg:right-4 lg:top-[100px] lg:bg-white lg:rounded-xl lg:p-4"
        @selectTone="setTone"
      />
      <InputBar
        class="w-full h-full mt-3 lg:mt-0"
        @generate="sendMessage"
        :isGenerating="isGenerating"
        :promptsLimit="usageStore.usage.promptsLimit"
        :hasPromptsLeft="usageStore.hasPromptsLeft"
        :promptsRemaining="usageStore.promptsRemaining"
      />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "chat",
  middleware: "auth",
});
const usageStore = useUsageStore();
const authStore = useAuthStore();
const selectedTone = ref("");
const isGenerating = ref(false);
const usedAllPrompts = ref(false);
// This composable set the scroll to the end of chat box
const { chatContainer, onMessageAdded } = useChatScroll();

// Fetch usage when page loads
onMounted(async () => {
  if (!usageStore.usage.promptsUsed && !usageStore.isLoading) {
    await usageStore.fetchUsage();
  }
});

const messages = ref([
  {
    id: 1,
    text: "سلام من کپشن ساز هستم چطور میتونم کمکت کتم ؟",
    isUser: false,
  },
]);

const sendMessage = async (val) => {
  messages.value.push({
    id: messages.value.length + 1,
    text: val,
    isUser: true,
  });
  generateCaption(val);
  onMessageAdded();
  try {
    await usageStore.incrementUsage();
  } catch (error) {
    usedAllPrompts.value = true;
  }
};

const setTone = (val) => {
  selectedTone.value = val;
};
const generateCaption = async (userInput) => {
  isGenerating.value = true;
  try {
    const response = await $fetch("/api/caption/generate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
      body: {
        prompt: userInput,
        options: {
          tone: selectedTone.value,
          includeEmojies: true,
          includeHashtags: true,
          language: "fa",
        },
      },
    });

    messages.value.push({
      isUser: false,
      text: response.caption,
      id: messages.value.length + 1,
    });
  } catch (error) {
    console.error("Caption generation error:", error);

    // Check if limit reached
    if (error.data?.data?.code === "LIMIT_REACHED") {
      usedAllPrompts.value = true;
      usageStore.usage = error.data.data.usage;

      messages.value.push({
        id: messages.value.length + 1,
        text: "متاسفانه تمام پرامپت‌های رایگان شما تمام شده! برای ادامه، لطفا اکانت خود را ارتقا دهید.",
        isUser: false,
      });
    } else {
      messages.value.push({
        id: messages.value.length + 1,
        text: "متاسفانه خطایی رخ داد. لطفا دوباره تلاش کنید.",
        isUser: false,
      });
    }

    onMessageAdded();
  } finally {
    isGenerating.value = false;
  }
};
</script>
