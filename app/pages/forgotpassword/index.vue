<template>
  <div class="w-full h-full flex items-center lg:p-10 p-4">
    <div
      class="w-full lg:w-10/12 h-full rounded-xl bg-white p-4 shadow-lg shadow-gray-300 flex flex-col"
    >
      <h2
        class="w-full text-center text-lg font-semibold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
      >
        فراموشی رمز عبور
      </h2>
      <p class="w-full text-center text-gray-600 mt-3 mb-12">
        به کپشن ساز خوش آمدید
      </p>
      <!-- Form -->
      <div class="w-full h-full">
        <ForgotPasswordForm />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth",
});
</script>
