<template>
  <div class="w-full h-full lg:p-4">
    <form class="w-full h-full" @submit.prevent="handelSignUp">
      <label for="name" class="text-gray-800">نام و نام خانوادگی</label>
      <div
        class="w-full my-3 flex items-center justify-start gap-x-2 bg-gray-100 rounded-xl py-4 px-3"
      >
        <Icon name="mdi:user-outline" size="25px" class="text-gray-400" />
        <input
          class="w-full focus:outline-0"
          id="name"
          type="text"
          v-model="name"
          required
          placeholder="نام و نام خانوادگی"
        />
      </div>
      <label for="email" class="text-gray-800">آدرس ایمیل</label>
      <div
        class="w-full my-3 flex items-center justify-start gap-x-2 bg-gray-100 rounded-xl py-4 px-3"
      >
        <Icon
          name="material-symbols:mail-outline"
          size="25px"
          class="text-gray-400"
        />
        <input
          class="w-full focus:outline-0"
          id="email"
          type="email"
          v-model="email"
          required
          placeholder="example@gmail.com"
        />
      </div>
      <label for="password" class="text-gray-800">رمز عبور</label>
      <div
        class="w-full my-3 flex items-center justify-start gap-x-2 bg-gray-100 rounded-xl py-4 px-3"
      >
        <Icon name="solar:lock-linear" size="23px" class="text-gray-400" />
        <input
          id="password"
          class="w-full focus:outline-0"
          type="password"
          v-model="password"
          required
          placeholder="رمز عبور(حداقل 6 کاراکتر)"
        />
      </div>
      <div class="w-full flex gap-x-3 mt-10 items-center">
        <input
          type="checkbox"
          required
          class="w-4 h-4 cursor-pointer accent-purple-500"
        />
        <label
          for="accept"
          class="text-gray-700 leading-relaxed cursor-pointer text-sm"
        >
          با
          <NuxtLink
            to="/"
            class="text-purple-600 font-semibold hover:underline"
          >
            قوانین و مقررات
          </NuxtLink>
          و
          <NuxtLink
            to="/"
            class="text-purple-600 font-semibold hover:underline"
          >
            حریم خصوصی
          </NuxtLink>
          موافقم
        </label>
      </div>
      <p class="text-red-500 mt-6" v-if="requestError">{{ requestError }}</p>
      <div class="w-full mt-8">
        <input
          type="submit"
          :disabled="isSendingRequest"
          :value="isSendingRequest ? 'در حال ایجاد حساب' : 'ایجاد حساب'"
          class="py-2 px-4 bg-linear-to-r from-purple-600 to-pink-600 rounded-xl text-white w-full cursor-pointer disabled:opacity-50"
        />
      </div>
    </form>
  </div>
</template>

<script setup>
const auth = useAuthStore();
const isSendingRequest = ref(false);
const name = ref("");
const email = ref("");
const password = ref("");
const requestError = ref(null);

const handelSignUp = async () => {
  try {
    isSendingRequest.value = true;
    await auth.signUp({
      name: name.value,
      email: email.value,
      password: password.value,
    });
    isSendingRequest.value = false;
    await navigateTo("/chat");
  } catch (error) {
    // Setting the error text --> This text will be sent from auth store catch block
    requestError.value = error.message;
    isSendingRequest.value = false;
    setTimeout(() => {
      requestError.value = false;
    }, 3000);
  }
};
</script>
