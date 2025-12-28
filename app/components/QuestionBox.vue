<template>
  <div
    @click="showInformation = !showInformation"
    class="w-full rounded-xl border border-dashed border-purple-400 bg-pink-50 flex flex-col items-start cursor-pointer transition-all duration-500 hover:opacity-85 overflow-hidden"
    :class="showInformation ? ' max-h-[1000px]' : 'max-h-18'"
  >
    <div class="w-full flex items-center justify-between">
      <div class="flex flex-col gap-y-3 text-gray-700 font-bold text-lg">
        <div class="flex items-center gap-x-1">
          <img src="/logo.png" alt="Logo" class="max-w-20 max-h-20" />
          <h2>{{ question.title }}</h2>
        </div>
      </div>
      <div class="mt-2 ml-2">
        <Icon
          name="mdi-light:chevron-down"
          size="32px"
          class="transition-all duration-300"
          :class="showInformation ? 'rotate-180' : 'rotate-0'"
        />
      </div>
    </div>
    <!-- Answer -->
    <div class="w-full p-7 rounded-xl text-gray-500">
      {{ question.answer }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["question"]);
const showInformation = ref(false);
</script>
