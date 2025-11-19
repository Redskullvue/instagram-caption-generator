<template>
  <div class="w-full h-max">
    <p>لحن خود را انتخاب کنید</p>
    <div class="w-full min-h-5 grid grid-cols-2 mt-2">
      <button
        class="m-1 rounded-xl cursor-pointer py-2 transition-colors duration-300"
        :class="
          selectedTone === tone
            ? 'bg-linear-to-r from-purple-600 to-pink-600 text-white'
            : 'bg-white text-gray-500'
        "
        v-for="(tone, index) in tones"
        :key="index"
        @click="setTone(tone)"
      >
        {{ tone }}
      </button>
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(["selectTone"]);
const selectedTone = ref("رسمی");
const tones = ref(["رسمی", "شوخ", "دوستانه", "الهام بخش"]);

const setTone = (value) => {
  if (value) {
    selectedTone.value = value;
    emits("selectTone", selectedTone.value);
    return;
  }
};
</script>
