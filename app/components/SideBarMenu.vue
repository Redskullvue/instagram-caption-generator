<template>
  <div class="w-full flex flex-col h-[99vh] bg-white text-gray-800">
    <div class="w-full flex items-center justify-end absolute text-xs"></div>
    <div class="w-full bg-pink-100">
      <UserProfile />
    </div>
    <div class="w-full mt-2 p-2 border-b border-gray-300">
      <button
        @click="createNewChat"
        class="rounded-xl bg-linear-to-r text-sm from-purple-600 mb-2 to-pink-600 w-full text-white py-2 flex items-center gap-x-2 justify-center cursor-pointer transition-all duration-300 hover:opacity-80"
      >
        <Icon name="ic:outline-plus" size="24px" />
        ایجاد گفتگو جدید
      </button>
      <NuxtLink
        to="/upgrade?plan=Enterprise"
        class="rounded-xl bg-gray-200 py-2 flex items-center justify-center transition-colors duration-300 hover:bg-gray-300 text-sm"
        >ارتقا/تمدید پلن</NuxtLink
      >
    </div>
    <div class="w-full h-full p-3">
      <h2 class="mb-2 text-xs text-gray-500">تاریخچه گفت گو ها</h2>
      <ul
        class="w-full h-[68vh] rounded-xl p-4 overflow-y-auto pb-10"
        v-if="chatStore.chatHistory.length >= 1"
      >
        <li
          v-for="(chat, index) in chatStore.chatHistory"
          :key="index"
          class="rounded-xl p-2 w-full mb-3 cursor-pointer border border-gray-300 flex"
          :class="
            chatStore.currentChatId === chat.id ? 'bg-purple-100' : 'bg-gray-50'
          "
        >
          <div class="w-max mx-1 p-1 mt-1">
            <Icon name="tdesign:chat" size="15px" class="text-purple-500" />
          </div>
          <div @click="handleLoadChat(chat.id)" class="w-full p-2">
            <div>
              <h2 class="mb-3 text-gray-500 text-sm font-light">
                {{ chat.title.substring(0, 20) }}...
              </h2>
              <p
                class="text-gray-500 text-[10px] mt-1 font-light mb-4"
                v-if="chat.lastMessage"
              >
                {{ chat.lastMessage.substring(0, 25) }}....
              </p>
            </div>

            <div class="w-full flex items-center justify-between">
              <p class="text-xs text-gray-400">{{ timeAgo(chat.createdAt) }}</p>
              <p @click="deleteChat(chat.id)" class="text-red-300">
                <Icon name="line-md:trash" size="20px" />
              </p>
            </div>
          </div>
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
const width = window.innerWidth;

const handleLoadChat = (chatId) => {
  chatStore.loadChat(chatId);
  if (width <= 1024) {
    emits("closeMenu");
  }
};

const createNewChat = () => {
  chatStore.createNewChat();
  if (width <= 1024) {
    emits("closeMenu");
  }
};

const deleteChat = (chatId) => {
  chatStore.deleteChat(chatId);
};
</script>
