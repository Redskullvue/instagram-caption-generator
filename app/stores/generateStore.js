import { defineStore } from "pinia";

export const useGenerateStore = defineStore("generateStore", () => {
  // Stores
  const chatStore = useChatStore();
  const authStore = useAuthStore();
  const usageStore = useUsageStore();
  // States
  const selectedMode = ref("captioner");
  const selectedAIEngine = ref("gemeni");
  const selectedTone = ref("causal");
  const selectedSocialMedia = ref("instagram");
  const usedAllPrompts = ref(false);
  // Actions
  const setTone = (val) => {
    selectedTone.value = val;
  };
  const setSocial = (val) => {
    selectedSocialMedia.value = val;
  };
  const setAi = (val) => {
    selectedAIEngine.value = val;
  };
  const setMode = (val) => {
    selectedMode.value = val;
  };

  const generateCaption = async (userInput) => {
    try {
      const response = await $fetch("/api/caption/generate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
        body: {
          prompt: userInput,
          chatId: chatStore.currentChatId,
          selectedAIEngine: selectedAIEngine.value,
          options: {
            tone: selectedTone.value,
            socialMedia: selectedSocialMedia.value,
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
      // Refresh history to update title/count
      await chatStore.loadChatHistory();
    } catch (error) {
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
    }
  };

  const generatePlan = async (userInput) => {
    {
      try {
        const response = await $fetch("/api/planner/generate", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
          body: {
            prompt: userInput,
            chatId: chatStore.currentChatId,
            selectedAIEngine: selectedAIEngine.value,
            options: {
              tone: selectedTone.value,
              socialMedia: selectedSocialMedia.value,
              includeEmojis: true,
              includeHashtags: true,
              language: "fa",
              maxLength: 600,
            },
          },
        });
        chatStore.currentChatId = response.chatId;
        chatStore.addMessage(response.plan, false, true);
        usageStore.usage = response.usage;
        // Refresh history to update title/count
        await chatStore.loadChatHistory();
      } catch (error) {
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
      }
    }
  };

  const generateImage = async (userInput) => {
    try {
      const response = await $fetch("/api/imagegenrator/generate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
        body: {
          prompt: userInput,
          chatId: chatStore.currentChatId,
        },
      });
      chatStore.currentChatId = response.chatId;
      chatStore.addMessage(response.message, false, true, response.imageUrl);
      usageStore.usage = response.usage;

      await chatStore.loadChatHistory();
    } catch (error) {
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
    }
  };

  return {
    selectedMode,
    selectedAIEngine,
    selectedTone,
    selectedSocialMedia,
    usedAllPrompts,
    setTone,
    setSocial,
    setAi,
    setMode,
    generateCaption,
    generatePlan,
    generateImage,
  };
});
