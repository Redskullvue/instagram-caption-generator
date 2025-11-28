import { defineStore } from "pinia";

export const useChatStore = defineStore("chatStore", () => {
  const currentChatId = ref(null);
  const messages = ref([]);
  const chatHistory = ref([]);

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

  const createNewChat = () => {
    currentChatId.value = "chat_" + Date.now();
    messages.value = [
      {
        id: Date.now(),
        text: "سلام من کپشن ساز هستم چطور میتونم کمکت کنم ؟",
        isUser: false,
        timestamp: new Date(),
        shouldAnimate: false,
      },
    ];

    return currentChatId.value;
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

    // If first user message in this chat, add to history
    if (isUser && messages.value.filter((m) => m.isUser).length === 1) {
      addChatToHistory(text);
    }

    // Save to localStorage
    saveChatToLocalStorage();

    return message;
  };

  const addChatToHistory = (firstMessage) => {
    // Check if the chat already exists
    const chatExists = chatHistory.value.find(
      (c) => c.id === currentChatId.value
    );
    if (!chatExists) {
      const newChat = {
        id: currentChatId.value,
        title:
          firstMessage.substring(0, 50) +
          (firstMessage.length > 50 ? "..." : ""),
        messageCount: messages.value.length,
        lastMessage: firstMessage,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      chatHistory.value.unshift(newChat);
      saveHistoryToLocalStorage();
    }
  };

  const updateChatInHistory = () => {
    const chatIndex = chatHistory.value.findIndex(
      (c) => c.id === currentChatId.value
    );

    if (chatIndex !== -1) {
      const userMessages = messages.value.filter((m) => m.isUser);
      const lastUserMessage = userMessages[userMessages.length - 1];
      chatHistory.value[chatIndex] = {
        ...chatHistory.value[chatIndex],
        messageCount: messages.value.length,
        lastMessage:
          lastUserMessage?.text ||
          messages.value[messages.value.length - 1]?.text,
        updatedAt: new Date(),
      };

      const chat = chatHistory.value.splice(chatIndex, 1)[0];
      chatHistory.value.unshift(chat);
      saveHistoryToLocalStorage();
    }
  };

  const saveChatToLocalStorage = () => {
    if (import.meta.client && currentChatId.value) {
      localStorage.setItem(
        `chat_${currentChatId.value}`,
        JSON.stringify({ id: currentChatId.value, messages: messages.value })
      );
      updateChatInHistory();
    }
  };

  const saveHistoryToLocalStorage = () => {
    if (import.meta.client) {
      localStorage.setItem("chatHistory", JSON.stringify(chatHistory.value));
    }
  };

  const loadHistoryFromLocalStorage = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem("chatHistory");
      if (saved) {
        chatHistory.value = JSON.parse(saved);
      }
    }
  };

  const deleteChat = (chatId) => {
    chatHistory.value = chatHistory.value.filter((c) => c.id !== chatId);

    if (import.meta.client) {
      localStorage.removeItem(`chat_${chatId}`);
      saveHistoryToLocalStorage();
    }

    // If deleting current chat, start new one
    if (currentChatId.value === chatId) {
      createNewChat();
    }
  };

  // Load chat from history
  const loadChat = (chatId) => {
    if (import.meta.client) {
      const savedChat = localStorage.getItem(`chat_${chatId}`);

      if (savedChat) {
        const chat = JSON.parse(savedChat);
        currentChatId.value = chatId;
        messages.value = chat.messages.map((msg) => ({
          ...msg,
          shouldAnimate: false,
        }));
        return true;
      }
    }
    return false;
  };

  const hydrate = () => {
    loadHistoryFromLocalStorage();
    if (!currentChatId.value) {
      createNewChat();
    }
  };
  return {
    currentChatId,
    messages,
    chatHistory,
    initializeChat,
    createNewChat,
    addMessage,
    loadChat,
    deleteChat,
    hydrate,
  };
});
