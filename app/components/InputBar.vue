<template>
  <div class="w-full h-16 mb-4">
    <p class="text-xs text-gray-500 mt-1" v-if="promptsLimit <= 999998">
      درخواست های باقی مانده : {{ promptsRemaining }} /
      <span class="text-purple-600">{{ promptsLimit }} </span>
    </p>
    <div class="w-full flex items-center justify-center gap-x-3">
      <div
        class="bg-linear-to-r mt-3 from-purple-600 to-pink-600 flex items-center justify-center p-1 rounded-xl w-full"
      >
        <textarea
          id="input-bar"
          type="text"
          v-model="inputValue"
          :disabled="!hasPromptsLeft || !isVerified"
          :placeholder="
            hasPromptsLeft
              ? 'موضوع خود را بنویسید'
              : 'درخواست های شما به پایان رسیده'
          "
          class="w-full rounded-lg bg-white resize-none focus:outline-0 disabled:bg-gray-200"
        ></textarea>
      </div>
      <button
        v-if="hasPromptsLeft"
        class="bg-linear-to-r from-purple-600 to-pink-600 flex items-center text-white justify-center gap-x-1 p-4 rounded-full mt-3 disabled:opacity-50 cursor-pointer"
        @click="generateCaption"
        :disabled="isGenerating"
      >
        <!-- <Icon name="mingcute:ai-fill" size="20px" /> -->
        <Icon name="tabler:send" size="20px" />
      </button>
      <NuxtLink
        v-if="!hasPromptsLeft"
        to="/upgrade"
        class="bg-linear-to-r from-purple-600 to-pink-600 flex items-center text-white justify-center gap-x-1 px-6 py-2 rounded-lg disabled:opacity-50 mt-4 cursor-pointer"
      >
        تمدید
      </NuxtLink>
    </div>

    <small
      class="text-xs w-full flex items-center justify-end mt-2"
      :class="currentChars > maxChars ? 'text-red-500' : 'text-green-500'"
    >
      {{ maxChars }}/{{ currentChars }}</small
    >
  </div>
</template>

<script setup>
const emits = defineEmits(["generate"]);
const props = defineProps({
  isGenerating: { type: Boolean, default: false },
  promptsRemaining: { type: Number, default: 0 },
  promptsLimit: { type: Number, default: 0 },
  hasPromptsLeft: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
});
const toastStore = useToastStore();
const maxChars = 500;
const inputValue = ref("");
const currentChars = computed(() => inputValue.value.length);

const generateCaption = () => {
  if (currentChars.value > maxChars) {
    toastStore.addToast("error", "موضوع نمیتواند بیشتر از 150 باشد");
    return;
  } else if (inputValue.value.length <= 1) {
    toastStore.addToast("error", "لطفا موضوعی بنویسید");
    return;
  } else {
    emits("generate", inputValue.value);
    inputValue.value = "";
  }
};
</script>
