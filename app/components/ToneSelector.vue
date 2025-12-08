<template>
  <div class="w-full h-max bg-gray-100 p-3 rounded-xl md:bg-transparent md:p-0">
    <div
      class="w-full flex items-center gap-x-3"
      @click="
        width > 1024
          ? (showToneSelector = true)
          : (showToneSelector = !showToneSelector)
      "
    >
      <p class="text-sm text-gray-800">لحن خود را انتخاب کنید</p>
      <p
        class="text-xs text-gray-600 lg:hidden bg-gray-100 rounded-xl px-3 py-2"
      >
        {{ tones[toneIndex].title }}
      </p>
      <i
        class="lg:hidden flex items-center justify-center transition-all duration-300"
        :class="showToneSelector ? 'rotate-180' : 'rotate-0'"
      >
        <Icon name="mdi-light:chevron-down" size="20px" />
      </i>
    </div>

    <div
      class="w-full min-h-5 grid grid-cols-2 mt-2 text-sm"
      v-if="showToneSelector"
    >
      <button
        class="m-1 rounded-xl cursor-pointer py-3 transition-colors duration-300 shadow-sm shadow-gray-300"
        :class="
          selectedTone === tone.value
            ? 'bg-linear-to-r from-purple-600 to-pink-600 text-white'
            : 'bg-gray-100 text-gray-700'
        "
        v-for="(tone, index) in tones"
        :key="index"
        @click="setTone(tone.value, index)"
      >
        {{ tone.title }}
      </button>
    </div>
  </div>
</template>

<script setup>
const width = window.innerWidth;
const emits = defineEmits(["selectTone"]);
const selectedTone = ref("casual");
const tones = ref([
  { title: "رسمی", value: "professional" },
  { title: "دوستانه", value: "casual" },
  { title: "شوخ", value: "funny" },
  { title: "انگیزشی", value: "inspirational" },
]);
// To show users what has been selected already
const toneIndex = ref(1);
// Show or not show the selection in mobile for better UX
const showToneSelector = ref(false);
onMounted(() => {
  if (width > 1024) {
    showToneSelector.value = true;
  }
});

// Set the tone
const setTone = (value, index) => {
  if (value) {
    selectedTone.value = value;
    toneIndex.value = index;
    emits("selectTone", selectedTone.value);
    if (width < 1024) {
      showToneSelector.value = false;
    }
    return;
  }
};
</script>
