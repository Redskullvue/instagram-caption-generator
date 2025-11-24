<template>
  <div class="w-full flex flex-col h-[99vh] bg-white text-gray-800">
    <div class="w-full flex items-center justify-end absolute text-xs">
      <button
        @click="$emit('closeMenu', false)"
        class="flex items-center gap lg:hidden px-2 py-1 rounded-lg bg-white"
      >
        بستن
        <Icon
          name="material-symbols-light:chevron-left"
          size="20px"
          class="font-bold"
        />
      </button>
    </div>
    <div class="w-full bg-pink-100">
      <UserProfile />
    </div>
    <div class="fixed bottom-0 p-2 mb-2 w-full lg:w-[20%]">
      <button
        @click="authStore.logOut"
        class="text-red-500 flex items-center gap-x-1 w-full cursor-pointer hover:bg-red-100 p-2 rounded-xl transition-colors duration-300"
      >
        <Icon name="mdi-light:power" size="24px" />
        خروج
      </button>
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(["closeMenu"]);
const authStore = useAuthStore();
</script>

<style lang="scss" scoped></style>
