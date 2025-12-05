<template>
  <div class="w-full h-full lg:p-4">
    <form class="w-full h-full" @submit.prevent="setNewPassword">
      <label for="password" class="text-gray-800">رمز عبور جدید</label>
      <div
        class="w-full my-3 flex items-center justify-start gap-x-2 bg-gray-100 rounded-xl py-4 px-3"
      >
        <Icon name="solar:lock-linear" size="24px" class="text-gray-400" />
        <input
          class="w-full focus:outline-0"
          id="password"
          type="password"
          v-model="password"
          required
          placeholder="رمز عبور جدید خود را وارد کنید"
        />
      </div>
      <div class="w-full mt-10">
        <button
          :disabled="isSendingRequest"
          class="py-2 px-4 bg-linear-to-r from-purple-600 to-pink-600 rounded-xl text-white w-full cursor-pointer disabled:opacity-70"
        >
          <p v-if="!isSendingRequest">تغییر رمز عبور</p>
          <p v-if="isSendingRequest">در حال تغییر رمز عبور</p>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
const authStore = useAuthStore();
const toastStore = useToastStore();
const password = ref("");
const isSendingRequest = ref(false);
const route = useRoute();

const setNewPassword = async () => {
  isSendingRequest.value = true;
  try {
    await authStore.resetPassword(
      route.query.token,
      password.value,
      route.query.userId
    );
    toastStore.addToast("success", "رمز عبور جدید ایجاد شد");
    await navigateTo("/login");
  } catch (error) {
    toastStore.addToast("error", error.message);
  } finally {
    isSendingRequest.value = false;
  }
};
</script>
