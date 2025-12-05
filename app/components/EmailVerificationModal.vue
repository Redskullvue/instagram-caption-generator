<template>
  <div
    v-if="!authStore.user.isVerified"
    class="w-max rounded-xl text-xs bg-purple-100 p-2 flex items-center justify-center flex-col text-center shadow-md shadow-gray-500"
  >
    <p>برای استفاده از کپشن ساز لطفا ایمیل خود را تایید کنید</p>
    <small class="mt-1 text-gray-500"
      >ایمیل دریافت نکردید ؟
      <span
        class="text-purple-500 underline cursor-pointer underline-offset-4"
        @click.once="$emit('sendEmail', authStore.token)"
      >
        دریافت ایمیل</span
      ></small
    >
  </div>
</template>

<script setup>
const authStore = useAuthStore();
const emits = defineEmits(["sendEmail"]);
</script>
