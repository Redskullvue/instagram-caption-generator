<template>
  <div
    class="rounded-xl px-2 py-1"
    :class="{
      'text-blue-500 bg-blue-300': color === 'blue',
      'text-red-500 bg-red-300': color === 'red',
      'text-green-500 bg-green-300': color === 'green',
      'text-yellow-500 bg-yellow-300': color === 'yellow',
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
