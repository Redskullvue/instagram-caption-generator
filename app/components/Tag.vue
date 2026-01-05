<template>
  <div
    class="rounded-xl px-3 py-1 border"
    :class="{
      'text-blue-600 bg-blue-300 border-blue-600': color === 'blue',
      'text-green-600 bg-green-300 border-green-600': color === 'green',
      'text-red-600 bg-red-300 border-red-600': color === 'red',
      'text-yellow-600 bg-yellow-300 border-yellow-600': color === 'yellow',
    }"
  >
    {{ text }}
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: "فعال",
  },
  color: {
    type: String,
    default: "green",
  },
});
</script>
