<template>
  <div class="min-h-screen w-full bg-pink-100 flex flex-col items-center p-10">
    <Transition name="fade" appear>
      <div class="bg-white py-2 rounded-xl px-8 mb-20">
        <p
          class="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          پلن ها
        </p>
      </div>
    </Transition>
    <div class="w-full flex items-center justify-center p-1 mb-4">
      <p class="text-center w-full text-3xl lg:text-4xl">
        پلنی که برای
        <span
          class="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
          >شما</span
        >
        مناسب هست رو انتخاب کنید
      </p>
    </div>
    <p
      class="text-center w-full text-balance text-gray-600 mb-10 lg:max-w-[80ch]"
    >
      از رایگان شروع کنید و با رشد خود، پلن را ارتقا دهید. بدون تعهد، لغو هر
      زمان که بخواهید
    </p>
    <!-- Plans -->
    <div
      class="w-full grid grid-cols-1 place-items-center gap-x-8 gap-y-6 lg:grid-cols-3 mt-10"
    >
      <div
        v-for="(plan, index) in plans"
        :key="index"
        class="bg-white shadow-md shadow-gray-300 p-10 w-full min-h-[680px] rounded-xl flex items-center flex-col"
      >
        <div class="w-full flex items-center justify-center">
          <img
            :src="plan.image"
            alt="Plans image"
            class="w-[110px] h-[110px] object-contain"
          />
        </div>
        <h2 class="w-full text-center text-2xl mt-3 lg:mt-1 lg:text-3xl">
          {{ plan.title }}
        </h2>
        <p class="w-full text-gray-500 text-center mt-4 text-sm">
          {{ plan.description }}
        </p>
        <p
          class="text-sm text-red-400 line-through mt-10"
          v-if="plan.mainPrice"
        >
          {{ plan.mainPrice }}تومان
        </p>
        <h3 class="mt-6 text-2xl lg:text-3xl">{{ plan.price || "رایگان" }}</h3>
        <NuxtLink
          :to="
            authStore.token
              ? `/upgrade?plan=${plan.title}`
              : `/signup?redirect=/upgrade?plan=${plan.title}`
          "
          class="w-full mt-10 bg-red-500 text-center text-white rounded-xl py-3 cursor-pointer transition-all duration-300 hover:opacity-80"
          :class="
            plan.title === 'Free'
              ? 'bg-slate-800'
              : 'bg-linear-to-r from-purple-600 to-pink-600'
          "
        >
          شروع {{ plan.title }}
        </NuxtLink>
        <div class="w-full text-start mt-10">
          <h4>امکانات :</h4>
        </div>
        <ul class="flex flex-col gap-y-3 w-full mt-3">
          <li
            v-for="(product, index) in plan.products"
            :key="index"
            class="w-full flex items-center gap-x-3"
            :class="product.isValid ? 'text-gray-700' : 'text-gray-400'"
          >
            <Icon
              name="lets-icons:check-fill"
              size="23px"
              v-if="product.isValid"
            />
            <Icon
              name="zondicons:close-solid"
              size="20px"
              v-if="!product.isValid"
            />
            {{ product.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "قیمت‌ها و پلن‌ها",
  meta: [
    {
      name: "description",
      content:
        "از پلن رایگان شروع کن پیج خودتو بالا بیار. انتخاب پلن مناسب برای تولید کپشن روزانه و رسیدن به قله های شبکه های مجازی مثل اینستاگرام",
    },
    { property: "og:title", content: "قیمت‌ها | کپشن‌ساز" },
    {
      property: "og:description",
      content:
        "قیمت‌ها و مقایسه پلن‌ها: رایگان، پرو و سازمانی. پلنی مناسب برای سطح استفاده خود انتخاب کنید.",
    },
    { property: "og:url", content: "https://captionsaz.ir/pricing" },
  ],
  link: [{ rel: "canonical", href: "https://captionsaz.ir/pricing" }],
});

const authStore = useAuthStore();

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
    price: "۱۴۹.۰۰۰ تومان ",
    mainPrice: "۳۱۹,۹۰۰",
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
</script>
