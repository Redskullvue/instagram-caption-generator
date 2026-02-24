<template>
  <div
    v-if="!authStore.user.isVerified"
    class="w-max rounded-xl text-xs bg-white p-2 flex items-center justify-center flex-col text-center shadow-md shadow-gray-500"
  >
    <Icon name="fluent-color:mail-16" size="60px" />
    <h2 class="font-bold my-2 text-lg">کاربر عزیز خوش اومدی !</h2>
    <p>برای فعال سازی حساب خودتون در کپشن ساز</p>
    <p class="mb-3 max-w-[40ch]">
      یک ایمیل از طرف ما برای شما ارسال شده به ایمیل خود بروید و روی لینک فعال
      سازی کلیک کنید تا حساب شما فعال شود
    </p>
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
