<template>
  <div
    class="rounded-xl px-2 py-1"
    :class="{
      'text-blue-600 bg-blue-300': color === 'blue',
      'text-green-600 bg-green-300': color === 'green',
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
