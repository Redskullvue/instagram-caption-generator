import { defineStore } from "pinia";

export const useChatStore = defineStore("chatStore", () => {
  const authStore = useAuthStore();
  const currentChatId = ref(null);
  const messages = ref([]);
  const chatHistory = ref([]);
  const isLoading = ref(false);

  const initializeChat = () => {
    if (messages.value.length === 0) {
      messages.value = [
        {
          id: Date.now(),
          text: "سلام من کپشن ساز هستم چطور میتونم کمکت کنم ؟",
          isUser: false,
          timestamp: new Date(),
          shouldAnimate: false,
        },
      ];
    }
  };

  const createNewChat = async () => {
    try {
      const response = await $fetch("/api/chats", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
        body: {
          title: "چت جدید",
        },
      });
      currentChatId.value = response.chat.id;
      messages.value = [
        {
          id: Date.now(),
          text: `سلام دوست عزیز به کپشن ساز خوش اومدی 😊
          این راهنما در جهت استفاده شما به بهترین شکل ممکن از کپشن ساز نمایش داده میشه❗ 
          <br/>
          توضیحات : 
          1️⃣در ردیف اول شما میتوانید مدل مد نظر خود را انتخاب کنید تا هوش مصنوعی انتخاب شده پاسخ دهد 
          <br/>
          2️⃣در ردیف دوم شما میتونید حالت هوش مصنوعی رو انتخاب کنید- کپشن نویس ، کپشن براتون میسازه و برنامه ریز برنامه هفتگی با توجه به موضوع پیجتون بهتون میده
          <br/>
          3️⃣انتخاب لحن در کپشن تاثیر گذار خواهد بود اما در حالت برنامه ریز تاثیری نخواهد داشت
          <br/> 
          4️⃣و در آخر شما با انتخاب پلتفرم کپشنی بر اساس همان پلتفرم دریافت خواهید کرد که به بهتر دیده شدن شما در پلتفرم مد نظر کمک میکند`,
          isUser: false,
          timestamp: new Date(),
          shouldAnimate: false,
        },
      ];
      // Refresh history
      await loadChatHistory();
      return response.chat;
    } catch (error) {
      console.error("Failed To Create New Chat", error);
      // FallBack to local if the API call fails
      currentChatId.value = "chat_" + Date.now();
      messages.value = [
        {
          id: Date.now(),
          text: `سلام دوست عزیز به کپشن ساز خوش اومدی 😊
          این راهنما در جهت استفاده شما به بهترین شکل ممکن از کپشن ساز نمایش داده میشه❗ 
          <br/>
          توضیحات : 
          1️⃣در ردیف اول شما میتوانید مدل مد نظر خود را انتخاب کنید تا هوش مصنوعی انتخاب شده پاسخ دهد 
          <br/>
          2️⃣در ردیف دوم شما میتونید حالت هوش مصنوعی رو انتخاب کنید- کپشن نویس ، کپشن براتون میسازه و برنامه ریز برنامه هفتگی با توجه به موضوع پیجتون بهتون میده
          <br/>
          3️⃣انتخاب لحن در کپشن تاثیر گذار خواهد بود اما در حالت برنامه ریز تاثیری نخواهد داشت
          <br/> 
          4️⃣و در آخر شما با انتخاب پلتفرم کپشنی بر اساس همان پلتفرم دریافت خواهید کرد که به بهتر دیده شدن شما در پلتفرم مد نظر کمک میکند`,
          isUser: false,
          timestamp: new Date(),
          shouldAnimate: false,
        },
      ];
    }
  };

  const addMessage = (text, isUser = true, shouldAnimate = true) => {
    const message = {
      id: Date.now() + Math.random(),
      text,
      isUser,
      timestamp: new Date(),
      shouldAnimate,
    };
    messages.value.push(message);
    return message;
  };
  // This gets the whole list of chats from DB
  const loadChatHistory = async () => {
    isLoading.value = true;
    try {
      const response = await $fetch("/api/chats", {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      chatHistory.value = response.chats;
      currentChatId.value = response.currentChatId;
    } catch (error) {
      console.error("Failed to load chat history:", error);
    } finally {
      isLoading.value = false;
    }
  };

  const deleteChat = async (chatId) => {
    try {
      await $fetch(`/api/chats/${chatId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      chatHistory.value = chatHistory.value.filter((c) => c.id !== chatId);
      // If deleting current chat, create new one
      if (currentChatId.value === chatId && chatHistory.value.length === 0) {
        await createNewChat();
      }
      if (currentChatId.value === chatId && chatHistory.value.length > 0) {
        currentChatId.value =
          chatHistory.value[chatHistory.value.length - 1].id;
        await loadChat(currentChatId.value);
      }
    } catch (error) {
      console.error("Failed to delete chat:", error);
      throw error;
    }
  };

  // Load specefic chat from DB
  const loadChat = async (chatId) => {
    isLoading.value = true;
    try {
      const response = await $fetch(`/api/chats/${chatId}`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });

      currentChatId.value = response.id;
      messages.value = response.messages;
      messages.value.unshift({
        id: Date.now(),
        text: `سلام دوست عزیز به کپشن ساز خوش اومدی 😊
          این راهنما در جهت استفاده شما به بهترین شکل ممکن از کپشن ساز نمایش داده میشه❗ 
          <br/>
          توضیحات : 
          1️⃣در ردیف اول شما میتوانید مدل مد نظر خود را انتخاب کنید تا هوش مصنوعی انتخاب شده پاسخ دهد 
          <br/>
          2️⃣در ردیف دوم شما میتونید حالت هوش مصنوعی رو انتخاب کنید- کپشن نویس ، کپشن براتون میسازه و برنامه ریز برنامه هفتگی با توجه به موضوع پیجتون بهتون میده
          <br/>
          3️⃣انتخاب لحن در کپشن تاثیر گذار خواهد بود اما در حالت برنامه ریز تاثیری نخواهد داشت
          <br/> 
          4️⃣و در آخر شما با انتخاب پلتفرم کپشنی بر اساس همان پلتفرم دریافت خواهید کرد که به بهتر دیده شدن شما در پلتفرم مد نظر کمک میکند`,
        isUser: false,
        timestamp: new Date(),
        shouldAnimate: false,
      });
      return true;
    } catch (error) {
      console.error("Failed to load chat:", error);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const hydrate = async () => {
    if (authStore.isAuthenticated) {
      await loadChatHistory();
      if (!currentChatId.value) {
        await createNewChat();
      }
    }
  };
  return {
    currentChatId,
    messages,
    chatHistory,
    isLoading,
    initializeChat,
    createNewChat,
    addMessage,
    loadChat,
    deleteChat,
    loadChatHistory,
    hydrate,
  };
});
