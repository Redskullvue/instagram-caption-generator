<template>
  <div class="w-full flex flex-col h-[99vh] bg-white text-gray-800">
    <div class="w-full flex items-center justify-end absolute text-xs">
      <button
        @click="$emit('closeMenu', false)"
        class="flex items-center gap lg:hidden px-2 py-1 rounded-lg bg-white"
      >
        بستن
        <Icon
          name="material-symbols-light:chevron-left"
          size="20px"
          class="font-bold"
        />
      </button>
    </div>
    <div class="w-full bg-pink-100">
      <UserProfile />
    </div>
    <div class="w-full mt-2 p-2">
      <button
        @click="chatStore.createNewChat"
        class="rounded-xl bg-linear-to-r from-purple-600 to-pink-600 w-full text-white py-2 flex items-center gap-x-2 justify-center cursor-pointer transition-all duration-300 hover:opacity-80"
      >
        <Icon name="ic:outline-plus" size="24px" />
        ایجاد گفتگو جدید
      </button>
    </div>
    <div class="w-full h-full p-3">
      <h2 class="mb-2 text-sm">تاریخچه گفت گو ها</h2>
      <ul
        class="w-full h-[68vh] rounded-xl p-4 overflow-y-auto pb-10"
        v-if="chatStore.chatHistory.length >= 1"
      >
        <li
          v-for="(chat, index) in chatStore.chatHistory"
          :key="index"
          class="rounded-xl p-2 w-full mb-3 cursor-pointer shadow-md shadow-gray-400"
          :class="
            chatStore.currentChatId === chat.id ? 'bg-pink-100' : 'bg-gray-100'
          "
          @click="handleLoadChat(chat.id)"
        >
          <h2 class="mb-3">{{ chat.title }}</h2>
          <p class="text-gray-700 text-sm mb-4">
            {{ chat.lastMessage.substring(0, 30) }}....
          </p>
          <p class="text-xs">{{ timeAgo(chat.createdAt) }}</p>
        </li>
      </ul>
      <p v-else class="w-full flex items-center justify-center mt-3">
        هنوز گفتگویی ایجاد نکردید
      </p>
    </div>
    <div class="fixed bottom-0 p-2 mb-2 w-full lg:w-[20%] bg-white">
      <button
        @click="authStore.logOut"
        class="text-red-500 flex items-center gap-x-1 w-full cursor-pointer hover:bg-red-100 p-2 rounded-xl transition-colors duration-300"
      >
        <Icon name="mdi-light:power" size="24px" />
        خروج
      </button>
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(["closeMenu"]);
const authStore = useAuthStore();
const chatStore = useChatStore();
const { timeAgo } = useDateChanger();

const handleLoadChat = (chatId) => {
  const width = window.innerWidth;
  chatStore.loadChat(chatId);
  if (width <= 1024) {
    emits("closeMenu");
  }
};
</script>
