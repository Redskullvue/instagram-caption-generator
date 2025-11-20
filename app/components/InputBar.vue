<template>
  <div class="w-full h-16 mb-4">
    <label for="input-bar">موضوع کپشن را انتخاب کنید</label>
    <div
      class="bg-linear-to-r mt-3 from-purple-600 to-pink-600 flex items-center justify-center p-1 rounded-xl"
    >
      <input
        id="input-bar"
        type="text"
        v-model="inputValue"
        placeholder="موضوع خود را بنویسید"
        class="w-full rounded-lg bg-white p-2 focus:outline-0"
      />
    </div>
    <small
      class="text-xs w-full flex items-center justify-end mt-2"
      :class="currentChars > maxChars ? 'text-red-500' : 'text-green-500'"
    >
      {{ maxChars }}/{{ currentChars }}</small
    >

    <button
      class="bg-linear-to-r from-purple-600 to-pink-600 flex items-center justify-center gap-x-1 text-white px-6 py-2 rounded-lg disabled:opacity-50 w-full mt-4 cursor-pointer"
      @click="generateCaption"
    >
      <Icon name="mingcute:ai-fill" size="20px" />
      تولید کن
    </button>
  </div>
</template>

<script setup>
const emits = defineEmits(["generate"]);
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
  }
};
</script>
