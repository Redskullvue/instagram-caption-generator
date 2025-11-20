<template>
  <div class="w-full h-full lg:p-4">
    <form class="w-full h-full">
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
          required
          placeholder="رمز عبور(حداقل 8 کاراکتر)"
        />
      </div>
      <div class="w-full mt-10">
        <button
          class="py-2 px-4 bg-linear-to-r from-purple-600 to-pink-600 rounded-xl text-white w-full cursor-pointer"
        >
          ورود به حساب
        </button>
      </div>
    </form>
  </div>
</template>

<script setup></script>
