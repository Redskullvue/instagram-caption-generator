<template>
  <div class="w-full min-h-screen">
    <!-- Hero Section -->
    <section
      class="w-full min-h-[600px] md:min-h-[600px] bg-pink-100 flex flex-col md:flex-row justify-center items-center"
    >
      <!-- Right Side -->
      <div class="flex-1 p-6 flex flex-col items-center md:items-start">
        <Transition name="slide-fade" appear>
          <div
            style="animation-delay: 0.2s"
            class="w-max h-10 rounded-xl mb-6 bg-white shadow-sm shadow-gray-300 px-4 py-2 text-sm font-light flex gap-x-2 items-center"
          >
            <span class="w-2 h-2 rounded-full bg-green-400"></span>

            <p>مورد استفاده بیش از 500 تولید کننده محتوا</p>
          </div>
        </Transition>
        <Transition name="fade" appear>
          <h1
            class="mr-1 font-bold text-xl text-center md:text-start"
            style="animation-delay: 0.5s"
          >
            کپشن اینستاگرام در
            <span
              class="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
              >چند ثانیه</span
            >، نه چند ساعت
          </h1>
        </Transition>
        <Transition name="fade" appear>
          <p
            style="animation-delay: 0.7s"
            class="mt-6 text-gray-600 font-light text-base w-full md:max-w-[600px] text-center md:text-start"
          >
            دیگر به صفحه خالی خیره نشوید. بگذارید هوش مصنوعی کپشن‌های جذاب و
            هماهنگ با برند شما را بسازد که مخاطبانتان را به کلیک، کامنت و
            اشتراک‌گذاری تشویق می‌کند.
          </p>
        </Transition>
        <div
          class="mt-6 flex items-center gap-x-5 md:flex-row flex-col gap-y-3 w-full md:w-max"
        >
          <Transition name="slide-fade" appear>
            <button
              style="animation-delay: 1s"
              class="bg-linear-to-r min-w-max w-full from-purple-600 justify-center to-pink-600 text-white p-3 rounded-xl text-sm font-light cursor-pointer flex items-center gap-x-1"
            >
              <Icon name="mdi:instagram" size="20px" />
              دریافت 5 پست رایگان در ماه
            </button>
          </Transition>
          <Transition name="fade" appear>
            <button
              style="animation-delay: 1s"
              class="p-3 bg-white w-full rounded-lg border border-gray-300 text-sm font-light cursor-pointer"
            >
              آموزش استفاده
            </button>
          </Transition>
        </div>
      </div>
      <!-- Left Side -->
      <div class="flex-1 md:p-6 mb-4">
        <Transition name="fade" appear>
          <img
            style="animation-delay: 0.7s"
            src="/preview.png"
            alt="instagram-content-creator-preview"
            class="max-w-[470px] max-h-[580px] w-[360px] md:w-[470px] shadow-lg shadow-gray-400"
          />
        </Transition>
      </div>
    </section>
    <!-- Perks and Points Section -->
    <section
      class="w-full min-h-[450px] bg-slate-50 flex flex-col p-6 relative"
    >
      <h2 class="w-full text-center mt-6 font-bold text-2xl">
        کپشن طراحی شده در 3 مرحله
      </h2>
      <p class="text-gray-600 w-full text-center mt-4">
        ژنراتور هوش مصنوعی ما کپشن‌های جذاب و هماهنگ با برند شما را متناسب با
        محتوایتان می‌سازد
      </p>
      <!-- Line -->
      <div
        class="absolute hidden md:block inset-x-0 top-1/2 h-px bg-linear-to-r from-transparent via-purple-500 to-transparent transform -translate-y-1/2 mt-6 z-0"
      ></div>
      <!-- Boxes -->
      <div
        class="w-full flex items-center justify-around flex-col md:flex-row mt-10"
        ref="observerTarget"
      >
        <TransitionGroup name="fade">
          <template v-if="isVisible" ref="observerRoot">
            <div
              v-for="(box, index) in boxesData"
              :key="index"
              :style="{ animationDelay: `${index * 0.7}s` }"
              class="w-full flex items-center justify-center min-h-[350px] flex-col"
            >
              <!-- Avatar -->
              <div>
                <div
                  class="relative w-28 h-28 rounded-full p-2 bg-linear-to-tr from-pink-500 via-fuchsia-500 to-purple-500"
                >
                  <div
                    class="flex items-center justify-center w-full h-full bg-white rounded-full"
                  >
                    <!-- Your icon goes here -->
                    <span class="mt-1 text-purple-500">
                      <Icon :name="box.icon" size="40px" />
                    </span>
                  </div>

                  <!-- Number badge -->
                  <div
                    class="absolute -top-2 -right-2 w-7 h-7 flex items-center justify-center rounded-full bg-pink-500 text-white text-sm font-bold shadow-md"
                  >
                    {{ index + 1 }}
                  </div>
                </div>
              </div>
              <!-- Text -->

              <p class="w-full mt-4 text-center text-lg">{{ box.title }}</p>
              <p class="w-7/12 mt-2 text-center text-gray-600">
                {{ box.description }}
              </p>
            </div>
          </template>
        </TransitionGroup>
      </div>
    </section>
    <!-- CTV -->
    <section
      class="w-full min-h-[600px] bg-pink-100 flex items-center justify-center p-3 md:p-6"
    >
      <div
        class="w-full md:w-7/12 rounded-xl bg-white shadow-md shadow-gray-400 p-6 flex items-center justify-start flex-col min-h-[450px] md:min-h-[400px]"
      >
        <div class="w-full flex items-center justify-center">
          <img src="/logo-2.png" alt="captionsaz-logo" />
        </div>
        <div class="w-full text-center border-b border-gray-200 min-h-[200px]">
          <h2 class="font-bold mb-2">آماده صرفه جویی در ساعت ها زمان؟</h2>
          <p class="text-gray-600 mb-10">
            به صدها تولیدکننده محتوا بپیوندید که برای همیشه با مشکل نوشتن کپشن
            خداحافظی کرده‌اند.
          </p>
          <NuxtLink
            to="/"
            class="py-2 px-4 bg-linear-to-r from-purple-600 to-pink-600 rounded-xl text-white mx-4"
          >
            تولید کپشن رایگان
          </NuxtLink>
        </div>
        <div
          class="w-full min-h-[100px] flex items-center justify-around text-center text-sm md:text-base"
        >
          <div>
            <p
              class="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              500+
            </p>
            <p>کاربر راضی</p>
          </div>
          <div>
            <p
              class="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              10K+
            </p>
            <p>کپشن تولید شده</p>
          </div>
          <div>
            <p
              class="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex justify-center"
            >
              4.9
              <Icon
                name="material-symbols-light:star"
                size="24px"
                class="text-purple-500 -mt-0.5"
              />
            </p>
            <p>امتیاز کاربران</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const observerTarget = ref(null);
const observerRoot = ref(null);
const { isVisible } = useObserver(observerTarget, {
  threshold: 0.2,
  root: observerRoot.value,
  once: true,
});

const boxesData = [
  {
    title: "موضوع خود را وارد کنید",
    description:
      "به ما بگویید پست شما درباره چیست - معرفی محصول، روتین روزانه، عکس سفر، هر چیزی!",
    icon: "icon-park-outline:write",
  },
  {
    title: "لحن خود را انتخاب کنید",
    description:
      "از بین صمیمی، رسمی، شوخ یا الهام‌بخش انتخاب کنید تا با صدای برند شما هماهنگ باشد",
    icon: "lets-icons:setting-vert",
  },
  {
    title: "دریافت 3 گزینه آماده انتشار",
    description:
      "سه کپشن منحصر به فرد و جذاب دریافت کنید. کپی کنید، پیست کنید و شاهد افزایش تعامل باشید",
    icon: "mingcute:ai-fill",
  },
];
</script>

<style>
.slide-fade-enter-active {
  animation: slideFade 0.7s;
  opacity: 0;
}

.slide-fade-leave-active {
  animation: slideFade 0.7s;
}

@keyframes slideFade {
  from {
    transform: translateX(20px);
    opacity: 0;
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.fade-enter-active,
.fade-leave-active {
  animation: fade 0.7s;
  opacity: 0;
}
</style>
