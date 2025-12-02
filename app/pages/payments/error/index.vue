<template>
  <div
    class="w-full flex items-start justify-center bg-pink-100 min-h-screen px-8"
  >
    <div
      class="bg-white w-full lg:w-[50%] rounded-xl min-h-[70vh] mt-10 p-3 flex flex-col items-center"
    >
      <h2 class="text-red-500 text-xl lg:text-2xl mb-8">پرداخت ناموفق بود</h2>
      <div class="mb-8">
        <img
          src="/failed.png"
          alt="Success Transaction"
          class="w-[100px] h-[100px] lg:max-w-[150px] lg:max-h-[150px]"
        />
      </div>
      <p class="text-center px-2 m-5 text-gray-600">
        درصورت عدم بازگشت وجه پرداختی در 72 ساعت با پشتیبانی تماس بگیرید و شناسه
        پرداخت رو ارائه کنید
      </p>
      <div
        class="bg-gray-100 rounded-xl text-center w-full lg:w-[70%] py-3 mb-10"
      >
        شناسه پرداخت : {{ route.query.trans_id }}
      </div>
      <NuxtLink
        to="/"
        class="bg-red-600 cursor-pointer text-white rounded-xl text-center w-full lg:w-[60%] py-3 mt-10 transition-colors duration-300 hover:bg-red-700"
      >
        پشتیبانی
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
</script>
