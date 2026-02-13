<template>
  <div class="w-full h-max bg-gray-100 p-3 rounded-xl md:bg-transparent md:p-0">
    <div
      class="w-full flex items-center gap-x-3"
      @click="
        width > 1024
          ? (showAiSelector = true)
          : (showAiSelector = !showAiSelector)
      "
    >
      <p class="text-sm text-gray-800">انتخاب هوش مصنوعی :</p>
      <p
        class="text-xs text-gray-600 lg:hidden bg-gray-200 rounded-xl px-3 py-2"
      >
        {{ AiList[AiIndex].title }}
      </p>
      <i
        class="lg:hidden flex items-center justify-center transition-all duration-300"
        :class="showAiSelector ? 'rotate-180' : 'rotate-0'"
      >
        <Icon name="mdi-light:chevron-down" size="20px" />
      </i>
    </div>

    <div
      class="w-full min-h-5 grid grid-cols-2 mt-2 text-sm"
      v-if="showAiSelector"
    >
      <button
        class="m-1 rounded-xl cursor-pointer py-3 transition-colors duration-300 shadow-sm shadow-gray-300 flex items-center justify-center"
        :class="
          selectedAi === ai.value
            ? 'bg-linear-to-r from-purple-600 to-pink-600 text-white'
            : 'bg-gray-200 text-gray-700'
        "
        v-for="(ai, index) in AiList"
        :key="index"
        @click="setAi(ai.value, index)"
      >
        <Icon :name="ai.icon" size="20px" class="mx-2" />
        {{ ai.title }}
      </button>
    </div>
  </div>
</template>

<script setup>
const width = window.innerWidth;
const generateStore = useGenerateStore();
const authStore = useAuthStore();
const toastStore = useToastStore();
const selectedAi = ref("gemeni");
const AiList = ref([
  {
    title: "Gpt5-Nano",
    value: "gpt",
    needsPremium: true,
    icon: "hugeicons:chat-gpt",
  },
  {
    title: "Gemeni-2.0 ",
    value: "gemeni",
    needsPremium: false,
    icon: "ri:gemini-line",
  },
  {
    title: "GPT-4o-Mini",
    value: "gpt-4o-mini",
    needsPremium: true,
    icon: "hugeicons:chat-gpt",
  },
]);
// To show users what has been selected already
const AiIndex = ref(1);
// Show or not show the selection in mobile for better UX
const showAiSelector = ref(false);
onMounted(() => {
  if (width > 1024) {
    showAiSelector.value = true;
  }
});

// Set the tone
const setAi = (value, index) => {
  if (authStore.user.plan !== "Free") {
    if (value) {
      selectedAi.value = value;
      AiIndex.value = index;
      generateStore.setAi(value);
      if (width < 1024) {
        showAiSelector.value = false;
      }
      return;
    }
  } else {
    toastStore.addToast(
      "error",
      "با پلن رایگان نمیتوانید هوش مصنوعی خود را تغییر دهید",
    );
  }
};
</script>
