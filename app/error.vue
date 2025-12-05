<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center"
  >
    <h1 class="text-4xl font-bold text-purple-600 mb-4">
      {{
        error?.statusCode === 404 ? "صفحه مورد نظر پیدا نشد" : "خطایی رخ داد"
      }}
    </h1>

    <p class="text-gray-600 mb-6">
      {{ error?.message }}
    </p>

    <button
      @click="handleError"
      class="px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700"
    >
      بازگشت به صفحه اصلی
    </button>
  </div>
</template>
<script setup>
const props = defineProps({
  error: Object,
});

const handleError = () => clearError({ redirect: "/" });
</script>
