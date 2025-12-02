<template>
  <div
    class="w-full flex items-start justify-center bg-pink-100 min-h-screen px-8"
  >
    <div
      class="bg-white w-full lg:w-[50%] rounded-xl min-h-[70vh] mt-10 p-3 flex flex-col items-center"
    >
      <h2 class="text-green-500 text-xl lg:text-2xl mb-8">
        پرداخت موفقیت آمیز بود
      </h2>
      <div class="mb-8">
        <img
          src="/success.png"
          alt="Success Transaction"
          class="w-[100px] h-[100px] lg:max-w-[150px] lg:max-h-[150px]"
        />
      </div>

      <div
        class="bg-gray-200 rounded-xl text-center w-full lg:w-[70%] py-3 mb-10"
      >
        شناسه پرداخت : {{ route.query.trans_id }}
      </div>
      <div>0:0{{ time }}</div>
      <NuxtLink
        to="/chat"
        class="bg-green-600 cursor-pointer text-white rounded-xl text-center w-full lg:w-[60%] py-3 mt-10 transition-colors duration-300 hover:bg-green-700"
      >
        الان برو
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const time = ref(5);

onMounted(() => {
  setInterval(() => {
    if (time.value > 1) {
      time.value--;
    } else {
      clearInterval();
    }
  }, 1000);
  setTimeout(() => {
    navigateTo("/chat");
  }, 5000);
});
</script>
