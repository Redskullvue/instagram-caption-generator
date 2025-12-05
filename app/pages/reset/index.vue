<template>
  <div class="w-full h-full flex items-center lg:p-10 p-4">
    <div
      class="w-full lg:w-10/12 h-full rounded-xl bg-white p-4 shadow-lg shadow-gray-300 flex flex-col 2xl:items-center 2xl:justify-center"
    >
      <h2
        class="w-full text-center text-lg font-semibold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
      >
        تغییر رمز عبود
      </h2>
      <p class="w-full text-center text-gray-600 mt-3 mb-12">
        به کپشن ساز خوش آمدید
      </p>
      <!-- Form -->
      <div class="w-full h-max">
        <ResetPasswordForm />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth",
});
</script>
