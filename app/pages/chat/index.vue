<template>
  <div class="w-full flex items-center max-h-[79vh] flex-col">
    <!-- Chat box -->
    <div
      class="w-full lg:max-h-[60vh] lg:min-h-[55vh] max-h-[44vh] overflow-y-scroll px-2 py-1 overflow-x-hidden"
      ref="chatContainer"
      @scroll="handleScroll"
    >
      <template
        v-for="(message, index) in chatStore.messages"
        :key="message.id"
      >
        <ChatBubble :message="message" class="mb-6" />
        <div class="w-full flex items-center justify-end">
          <button
            @click="openInstagram"
            class="bg-linear-to-r from-purple-600 to-pink-600 rounded-xl text-white p-1 -mt-4 mx-2 flex items-center justify-center cursor-pointer"
            v-if="
              !message.isUser &&
              index !== 0 &&
              generateStore.selectedSocialMedia === 'instagram'
            "
          >
            <Icon name="mdi:instagram" size="19px" />
          </button>
          <CopyButton
            v-if="!message.isUser && index !== 0"
            class="-mt-2 w-max text-end pl-4"
            :message="message.text"
          />
        </div>
      </template>
      <TypingIndicator v-if="isGenerating === true" />
    </div>
    <div class="absolute bottom-[40%] lg:bottom-[30%] lg:left-[50%] left-[48%]">
      <ScrollButton v-if="needsScroll" @click="setScrollToBottom" />
    </div>

    <!-- Buttons and input Selector -->
    <div
      class="w-full p-2 overflow-y-scroll flex flex-col min-h-[16vh] lg:absolute lg:right-4 lg:top-[100px] lg:w-[340px] lg:h-[83vh]"
    >
      <AiSelector
        class="w-full h-full lg:max-w-[300px] lg:bg-white lg:rounded-xl lg:p-4"
      />
      <ModeSelector
        class="w-full h-full lg:max-w-[300px] lg:bg-white lg:rounded-xl lg:p-4 mt-4"
      />
      <ToneSelector
        class="w-full h-full lg:max-w-[300px] lg:bg-white lg:rounded-xl lg:p-4 mt-4"
      />
      <SocialSelector
        class="w-full h-full lg:max-w-[300px] lg:bg-white lg:rounded-xl lg:p-4 mt-4"
      />
    </div>
    <div class="w-full">
      <InputBar
        class="w-full mt-3 lg:mt-0"
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

useHead({
  title: "گفت و گو",
  meta: [
    {
      name: "description",
      content:
        "فقط در چند ثانیه کپشن های حرفه ای بسازید و راه خودتون رو برای رسیدن به اکسپلور و دیده شدن هموار کنید",
    },
    {
      property: "og:title",
      content:
        "کپشن‌ساز — تولید کپشن برای نمایش در اکسپلور اینستاگرام و سایر شبکه های مجازی",
    },
    {
      property: "og:description",
      content:
        "کپشن‌ساز به شما کمک می‌کند کپشن‌های جذاب و ترند بسازید تا پست‌های شما مخاطب بیشتری جذب کنند.",
    },
    { property: "og:url", content: "https://captionsaz.ir/chat" },
  ],
  link: [{ rel: "canonical", href: "https://captionsaz.ir/chat" }],
});

// Stores
const usageStore = useUsageStore();
const authStore = useAuthStore();
const chatStore = useChatStore();
const generateStore = useGenerateStore();

const isGenerating = ref(false);
const userInput = ref("");

// Check if user needs to scroll
const needsScroll = ref(false);

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
  isGenerating.value = true;
  // Add user message to chatStore
  chatStore.addMessage(val, true);
  userInput.value = val;
  onMessageAdded();
  // Generate AI response
  try {
    if (generateStore.selectedMode === "captioner") {
      await generateStore.generateCaption(val);
    }
    if (generateStore.selectedMode === "planner") {
      await generateStore.generatePlan(val);
    }
    if (generateStore.selectedMode === "imageGenerator") {
      await generateStore.generateImage(val);
    }
  } catch (error) {
    console.log(error);
  } finally {
    onMessageAdded();
    isGenerating.value = false;
  }
};
// Check and see if user needs scrolling
const handleScroll = () => {
  const isAtBottom =
    chatContainer.value.scrollHeight -
      chatContainer.value.clientHeight -
      chatContainer.value.scrollTop <
    10;
  needsScroll.value = !isAtBottom;
};

// send user to the bottom of chat
const setScrollToBottom = () => {
  chatContainer.value.scrollTo({
    top: chatContainer.value.scrollHeight,
    behavior: "smooth",
  });
};

const openInstagram = () => {
  navigator.clipboard.writeText(userInput.value);
  window.open("https://www.instagram.com/create/select/", "_blank");
};
</script>
