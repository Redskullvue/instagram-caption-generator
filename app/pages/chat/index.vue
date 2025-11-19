<template>
  <div class="w-full flex items-center justify-center h-full flex-col">
    <!-- Chat box -->
    <div class="w-full h-2/3">Chat Box</div>
    <!-- Buttons and input Selector -->
    <div
      class="w-full h-1/3 border-t border-gray-500 p-2 overflow-y-scroll max-h-1/3 flex flex-col"
    >
      <ToneSelector class="w-full h-full" />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "chat",
});
</script>
