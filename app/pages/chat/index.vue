<template>
  <div class="w-full flex items-center max-h-[79vh] flex-col">
    <!-- Chat box -->
    <div
      class="w-full lg:max-h-[55vh] lg:min-h-[55vh] min-h-[50vh] max-h-[50vh] overflow-y-scroll px-2 py-1"
      ref="chatContainer"
    >
      <template
        v-for="(message, index) in chatStore.messages"
        :key="message.id"
      >
        <ChatBubble :message="message" class="mb-6" />
        <div class="w-full flex items-center justify-end">
          <CopyButton
            v-if="!message.isUser && index !== 0"
            class="-mt-2 w-max text-end pl-4"
            :message="message.text"
          />
        </div>
      </template>
      <TypingIndicator v-if="isGenerating === true" />
    </div>

    <!-- Buttons and input Selector -->
    <div
      class="w-full max-h-1/2 p-2 overflow-y-scroll lg:overflow-y-hidden flex flex-col lg:min-h-[28vh]"
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
        :isVerified="authStore.user.isVerified"
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
const chatStore = useChatStore();

const selectedTone = ref("");
const isGenerating = ref(false);
const usedAllPrompts = ref(false);

const { chatContainer, onMessageAdded } = useChatScroll();

// Fetch usage when page loads
onMounted(async () => {
  if (!usageStore.usage.promptsUsed && !usageStore.isLoading) {
    await usageStore.fetchUsage();
    await chatStore.hydrate();
  }

  // Smart initialization: only create if no current chat exists
  if (!chatStore.currentChatId || chatStore.messages.length === 0) {
    // Check if we need to load existing chat or create new
    if (chatStore.currentChatId) {
      // We have a chatId but no messages - load it
      await chatStore.loadChat(chatStore.currentChatId);
    } else {
      chatStore.initializeChat();
    }
  }
});

const sendMessage = async (val) => {
  // Add user message to chatStore
  chatStore.addMessage(val, true);
  onMessageAdded();
  // Generate AI response
  await generateCaption(val);
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
        chatId: chatStore.currentChatId,
        options: {
          tone: selectedTone.value,
          includeEmojis: true,
          includeHashtags: true,
          language: "fa",
          maxLength: 600,
        },
      },
    });
    chatStore.currentChatId = response.chatId;
    chatStore.addMessage(response.caption, false, true);
    usageStore.usage = response.usage;
    onMessageAdded();
    // Refresh history to update title/count
    await chatStore.loadChatHistory();
  } catch (error) {
    console.error("Caption generation error:", error);

    // Check if limit reached
    if (error.data?.data?.code === "LIMIT_REACHED") {
      usedAllPrompts.value = true;
      usageStore.usage = error.data.data.usage;

      chatStore.addMessage(
        "متاسفانه تمام پرامپت‌های رایگان شما تمام شده! برای ادامه، لطفا اکانت خود را ارتقا دهید.",
        false,
        true
      );
    } else {
      chatStore.addMessage(
        "متاسفانه خطایی رخ داد. لطفا دوباره تلاش کنید.",
        false,
        true
      );
    }

    onMessageAdded();
  } finally {
    isGenerating.value = false;
  }
};
</script>
