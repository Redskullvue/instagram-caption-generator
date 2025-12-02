<template>
  <div class="min-h-screen w-full bg-pink-100 flex flex-col items-center p-10">
    <div class="w-full flex items-center justify-center p-1 mb-4">
      <p class="text-center w-full text-3xl lg:text-4xl">
        تکمیل خرید
        <span
          class="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >اشتراک</span
        >
      </p>
    </div>
    <p class="w-full text-gray-500 text-center">پلن خود را انتخاب کنید</p>
    <div
      class="w-full flex-col lg:flex-row flex items-center justify-center gap-x-6 mt-10 2xl:max-w-[80%] gap-y-4"
    >
      <div class="lg:w-2/3 w-full rounded-xl bg-white min-h-[50vh] p-4">
        <h2 class="text-xl">انتخاب پلن</h2>
        <div
          class="w-full flex flex-col items-center justify-center gap-y-4 mt-6"
        >
          <template v-for="(plan, index) in plans" :key="index">
            <PlanCard
              v-if="selectedPlan"
              :plan="plan"
              :currentPlan="selectedPlan.title"
              @selected-plan="selectPlan"
            />
          </template>
        </div>
      </div>
      <div class="lg:w-1/3 w-full rounded-xl bg-white min-h-[50vh] p-4">
        <h2 class="text-xl mb-6">خلاصه سفارش</h2>
        <PlanCard v-if="selectedPlan" :plan="selectedPlan" class="mb-3" />
        <div class="w-full border-t border-dashed border-gray-500">
          <div class="w-full flex items-center justify-between mt-4 px-2">
            <p>قیمت پلن :</p>
            <p v-if="selectedPlan">{{ selectedPlan.price }}</p>
          </div>
          <div class="w-full flex items-center justify-between mt-4 px-2">
            <p>تخفیف</p>
            <p v-if="selectedPlan" class="text-green-500">۰ تومان</p>
          </div>
          <div
            class="w-full mt-6 border-t border-dashed border-gray-500 flex items-center justify-between py-4 mb-6"
          >
            <p>مجموع :</p>
            <p v-if="selectedPlan">
              {{ selectedPlan.price }}
            </p>
          </div>
          <button
            @click="sendToGateWay"
            class="w-full text-white bg-linear-to-r from-purple-600 to-pink-600 rounded-xl cursor-pointer py-3 transition-all duration-300 hover:opacity-80"
          >
            تکمیل خرید
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
const authStore = useAuthStore();
const selectedPlan = ref(null);
const route = useRoute();
onMounted(() => {
  if (route.query.plan) {
    selectedPlan.value = plans.find(({ title }) => title === route.query.plan);
  } else {
    selectedPlan.value = plans[1];
  }
});

const selectPlan = (val) => {
  selectedPlan.value = val;
};
const plans = [
  {
    title: "Free",
    price: "رایگان",
    image: "/Pricing-1.png",
    description: "برای شروع و آزمایش",
    products: [
      { title: "5 کپشن در ماه", isValid: true },
      { title: "دسترسی به هشتگ ها", isValid: true },
      { title: "پشتیبانی اولویت دار", isValid: false },
      { title: "دسترسی به سناریو نویس", isValid: false },
    ],
  },
  {
    title: "Pro",
    price: "۴۹.۹۰۰ تومان",
    mainPrice: "۱۱۹,۹۰۰",
    image: "/Pricing-2.png",
    description: "برای سازندگان محتوای حرفه‌ای",
    products: [
      { title: "70 کپشن در ماه", isValid: true },
      { title: "دسترسی به هشتگ ها", isValid: true },
      { title: "پشتیبانی اولویت دار", isValid: true },
      { title: "دسترسی به سناریو نویس (به زودی)", isValid: true },
    ],
  },
  {
    title: "Enterprise",
    price: "۷۹.۹۰۰ تومان ",
    mainPrice: "۲۱۹,۹۰۰",
    image: "/Pricing-3.png",
    description: "برای کسب‌وکارها و آژانس‌ها",
    products: [
      { title: "کپشن های نامحدود", isValid: true },
      { title: "دسترسی به هشتگ ها", isValid: true },
      { title: "پشتیبانی اولویت دار", isValid: true },
      { title: "دسترسی به سناریو نویس (به زودی)", isValid: true },
    ],
  },
];

const sendToGateWay = async () => {
  try {
    const response = await $fetch("/api/payments/initiate", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
      body: {
        planName: selectedPlan.value.title,
      },
    });
    if (response.code > 0) {
      window.location.href = `https://bitpay.ir/payment-test/gateway-${response.code}-get`;
    }
  } catch (error) {
    console.log(error);
  }
};
</script>
