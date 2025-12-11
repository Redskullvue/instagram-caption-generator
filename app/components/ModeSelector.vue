<template>
  <div class="w-full h-max bg-gray-100 p-3 rounded-xl md:bg-transparent md:p-0">
    <div
      class="w-full flex items-center gap-x-3"
      @click="
        width > 1024
          ? (showModeSelector = true)
          : (showModeSelector = !showModeSelector)
      "
    >
      <p class="text-sm text-gray-800">انتخاب حالت :</p>
      <p
        class="text-xs text-gray-600 lg:hidden bg-gray-200 rounded-xl px-3 py-2"
      >
        {{ modes[modeIndex].title }}
      </p>
      <i
        class="lg:hidden flex items-center justify-center transition-all duration-300"
        :class="showModeSelector ? 'rotate-180' : 'rotate-0'"
      >
        <Icon name="mdi-light:chevron-down" size="20px" />
      </i>
    </div>

    <div
      class="w-full min-h-5 grid grid-cols-2 mt-2 text-sm"
      v-if="showModeSelector"
    >
      <button
        class="m-1 rounded-xl cursor-pointer py-3 transition-colors duration-300 shadow-sm shadow-gray-300"
        :class="
          selectedMode === social.value
            ? 'bg-linear-to-r from-purple-600 to-pink-600 text-white'
            : 'bg-gray-200 text-gray-700'
        "
        v-for="(social, index) in modes"
        :key="index"
        @click="setMode(social.value, index)"
      >
        {{ social.title }}
      </button>
    </div>
  </div>
</template>

<script setup>
const width = window.innerWidth;
const generateStore = useGenerateStore();
const authStore = useAuthStore();
const toastStore = useToastStore();
const selectedMode = ref("captioner");
const modes = ref([
  { title: "کپشن نویس", value: "captioner" },
  { title: "برنامه ریز", value: "planner" },
]);
// To show users what has been selected already
const modeIndex = ref(0);
// Show or not show the selection in mobile for better UX
const showModeSelector = ref(false);
onMounted(() => {
  if (width > 1024) {
    showModeSelector.value = true;
  }
});

// Set the Mode
const setMode = (value, index) => {
  if (authStore.user.plan === "Free") {
    toastStore.addToast("error", "در پلن رایگان این مورد پشتیبانی نمیشود");
    return;
  }
  if (value) {
    selectedMode.value = value;
    modeIndex.value = index;
    generateStore.setMode(value);
    if (width < 1024) {
      showModeSelector.value = false;
    }
    return;
  }
};
</script>
