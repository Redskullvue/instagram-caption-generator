<template>
  <div
    class="w-full rounded-xl bg-white flex px-4 min-h-32 shadow-md shadow-gray-200 py-7"
  >
    <div class="flex flex-col w-full gap-y-4">
      <Icon :name="icon" size="35px" class="text-purple-500" />
      <p class="text-gray-500">{{ title }}</p>
    </div>
    <div class="text-end w-full">
      <p class="text-purple-500 text-3xl">{{ value }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
