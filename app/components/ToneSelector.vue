<template>
  <div class="w-full h-max">
    <p>لحن خود را انتخاب کنید</p>
    <div class="w-full min-h-5 grid grid-cols-2 mt-2">
      <button
        class="m-1 rounded-xl cursor-pointer py-2 transition-colors duration-300"
        :class="
          selectedTone === tone.value
            ? 'bg-linear-to-r from-purple-600 to-pink-600 text-white'
            : 'bg-gray-200 text-gray-700'
        "
        v-for="(tone, index) in tones"
        :key="index"
        @click="setTone(tone.value)"
      >
        {{ tone.title }}
      </button>
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(["selectTone"]);
const selectedTone = ref("casual");
const tones = ref([
  { title: "رسمی", value: "professional" },
  { title: "دوستانه", value: "casual" },
  { title: "شوخ", value: "funny" },
  { title: "انگیزشی", value: "inspirational" },
]);

const setTone = (value) => {
  if (value) {
    selectedTone.value = value;
    emits("selectTone", selectedTone.value);
    return;
  }
};
</script>
