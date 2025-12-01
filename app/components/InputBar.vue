<template>
  <div class="w-full h-16 mb-4">
    <label for="input-bar">موضوع کپشن را انتخاب کنید</label>
    <p class="text-xs text-gray-500 mt-1" v-if="promptsLimit <= 999998">
      درخواست های باقی مانده : {{ promptsRemaining }} /
      <span class="text-purple-600">{{ promptsLimit }} </span>
    </p>
    <div
      class="bg-linear-to-r mt-3 from-purple-600 to-pink-600 flex items-center justify-center p-1 rounded-xl"
    >
      <input
        id="input-bar"
        type="text"
        v-model="inputValue"
        :disabled="!hasPromptsLeft"
        :placeholder="
          hasPromptsLeft
            ? 'موضوع خود را بنویسید'
            : 'درخواست های شما به پایان رسیده'
        "
        class="w-full rounded-lg bg-white p-2 focus:outline-0 disabled:bg-gray-200"
      />
    </div>
    <small
      class="text-xs w-full flex items-center justify-end mt-2"
      :class="currentChars > maxChars ? 'text-red-500' : 'text-green-500'"
    >
      {{ maxChars }}/{{ currentChars }}</small
    >

    <button
      v-if="hasPromptsLeft"
      class="bg-linear-to-r from-purple-600 to-pink-600 flex items-center text-white justify-center gap-x-1 px-6 py-2 rounded-lg disabled:opacity-50 w-full mt-4 cursor-pointer"
      @click="generateCaption"
      :disabled="isGenerating"
    >
      <Icon name="mingcute:ai-fill" size="20px" />
      تولید کن
    </button>
    <NuxtLink
      v-if="!hasPromptsLeft"
      to="/"
      class="bg-linear-to-r from-purple-600 to-pink-600 flex items-center text-white justify-center gap-x-1 px-6 py-2 rounded-lg disabled:opacity-50 w-full mt-4 cursor-pointer"
    >
      خرید درخواست های بیشتر
    </NuxtLink>
  </div>
</template>

<script setup>
const emits = defineEmits(["generate"]);
const props = defineProps({
  isGenerating: { type: Boolean, default: false },
  promptsRemaining: { type: Number, default: 0 },
  promptsLimit: { type: Number, default: 0 },
  hasPromptsLeft: { type: Boolean, default: true },
});
const maxChars = 100;
const inputValue = ref("");
const currentChars = computed(() => inputValue.value.length);

const generateCaption = () => {
  if (currentChars.value > maxChars) {
    console.log("More Than 100 Chars");
    return;
  } else if (inputValue.value.length <= 1) {
    console.log("Fill the input");
    return;
  } else {
    emits("generate", inputValue.value);
    inputValue.value = "";
  }
};
</script>
