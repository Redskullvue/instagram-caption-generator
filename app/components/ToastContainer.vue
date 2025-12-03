<template>
  <div
    class="w-[300px] fixed top-5 mt-2 right-5 h-max z-9999 flex items-center justify-center flex-col gap-y-4"
  >
    <TransitionGroup name="toast">
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        class="w-[300px] h-20 px-2 rounded-xl flex items-center justify-center flex-col text-white z-9999 relative"
        :class="toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'"
        @click="toastStore.removeToast(toast.id)"
      >
        <button
          class="w-max absolute right-3 top-3 cursor-pointer"
          @click="toastStore.removeToast(toast.id)"
        >
          <Icon name="zondicons:close-solid" size="18px" />
        </button>
        <p class="w-full text-center mr-2 text-xs">{{ toast.message }}</p>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
const toastStore = useToastStore();
</script>

<style>
/* Animation */
.toast-enter-active {
  animation: slide-in 0.3s ease-out;
}

.toast-leave-active {
  animation: slide-out 0.3s ease-in;
}

@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>
