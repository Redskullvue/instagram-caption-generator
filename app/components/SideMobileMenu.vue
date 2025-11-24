<template>
  <div class="w-full flex flex-col h-[99vh] bg-white text-gray-800 p-4">
    <div class="w-full flex items-center justify-start">
      <button
        @click="$emit('closeMenu', false)"
        class="flex items-center gap lg:hidden"
      >
        بستن
        <Icon
          name="material-symbols-light:chevron-left"
          size="20px"
          class="font-bold"
        />
      </button>
    </div>

    This is the side menu
  </div>
</template>

<script setup>
const emits = defineEmits(["closeMenu"]);
</script>

<style lang="scss" scoped></style>
