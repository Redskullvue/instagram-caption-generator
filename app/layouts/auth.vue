<template>
  <div class="w-full h-screen bg-pink-50 flex items-center justify-center">
    <!-- Right-side -->
    <div class="lg:w-1/2 hidden lg:flex h-screen flex-col">
      <div class="mx-2 flex items-center min-h-[100px]">
        <img
          class="max-w-[85px] max-h-[85px]"
          src="/logo.png"
          alt="لوگو-کپشن ساز"
        />
        <h1 class="font-bold text-lg">کپشن ساز</h1>
      </div>
      <div class="p-10">
        <h2 class="text-xl">
          به خانواده
          <span
            class="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            >کپشن ساز</span
          >
          بپیوندید
        </h2>
        <p class="text-gray-600 mt-3">
          بیش از 500 تولید کننده محتوا به ما اطمینان کرده اند
        </p>
      </div>
      <!-- Boxes -->
      <div class="w-full flex flex-col gap-y-10 p-10">
        <div
          class="w-2/3 rounded-xl bg-white shadow-sm shadow-gray-300 p-4 min-h-20 flex items-center justify-between"
          v-for="(box, index) in boxes"
          :key="index"
        >
          <div>
            <p>{{ box.title }}</p>
            <p class="text-gray-600 mt-2">{{ box.description }}</p>
          </div>
          <div
            class="flex items-ceter justify-center bg-pink-200 rounded-lg p-4"
          >
            <Icon :name="box.icon" size="20px" class="text-purple-500" />
          </div>
        </div>
      </div>
    </div>
    <!-- Forms -->
    <div class="lg:w-1/2 w-full h-screen">
      <slot />
    </div>
  </div>
</template>

<script setup>
const boxes = [
  {
    title: "کپشن های هوشمند",
    description: "تولید کپشن با هوش مصنوعی در چند ثانیه",
    icon: "mingcute:ai-fill",
  },
  {
    title: "5 پست رایگان ماهانه",
    description: "بدون نیاز به کارت اعتباری",
    icon: "mdi:instagram",
  },
  {
    title: "پشتیبانی 24/7",
    description: "همیشه در کنار شما هستیم",
    icon: "mdi:tick",
  },
];
</script>
