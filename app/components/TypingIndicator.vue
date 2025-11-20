<template>
  <div class="flex items-center justify-center gap-x-1 absolute w-max left-8">
    <div
      class="w-2 h-2 bg-purple-400 rounded-full typing-animation"
      style="animation-delay: 0.1s"
    ></div>
    <div
      class="w-2 h-2 bg-purple-500 rounded-full typing-animation"
      style="animation-delay: 0.2s"
    ></div>
    <div
      class="w-2 h-2 bg-purple-600 rounded-full typing-animation"
      style="animation-delay: 0.3s"
    ></div>
  </div>
</template>

<script setup></script>

<style scoped>
.typing-animation {
  animation: typing 1s infinite;
}
@keyframes typing {
  from {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(3px);
  }
  to {
    transform: translateY(0px);
  }
}
</style>
