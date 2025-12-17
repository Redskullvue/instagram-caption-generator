<template>
  <div class="w-full min-h-screen">
    <!-- Hero Section -->
    <section
      class="w-full min-h-[600px] md:min-h-[600px] bg-pink-100 flex flex-col md:flex-row justify-center items-center"
    >
      <!-- Right Side -->
      <div class="flex-1 p-1 lg:p-6 flex flex-col items-center mt-5 lg:mt-0">
        <Transition name="slide-fade" appear>
          <div
            v-show="mounted"
            style="animation-delay: 0.2s"
            class="w-max h-10 rounded-xl mb-6 bg-white shadow-sm shadow-gray-300 px-4 py-2 text-sm font-light flex gap-x-2 items-center"
          >
            <span class="w-2 h-2 rounded-full bg-green-400"></span>

            <p>پشتیبانی از دو مدل هوش مصنوعی (GPT و Gemini)</p>
          </div>
        </Transition>
        <Transition name="fade" appear>
          <h1
            v-show="mounted"
            class="mr-1 font-bold text-2xl lg:text-3xl text-center"
            style="animation-delay: 0.5s"
          >
            مدیریت هوشمند اینستاگرام در
            <span
              class="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
              >چند ثانیه</span
            >، نه چند ساعت
          </h1>
        </Transition>
        <Transition name="fade" appear>
          <p
            v-show="mounted"
            style="animation-delay: 0.7s"
            class="mt-6 text-gray-600 font-light text-base w-[38ch] lg:w-[50ch] text-center text-balance"
          >
            کپشن‌ساز فقط کپشن نمی‌سازد. پیج اینستاگرام شما را تحلیل می‌کند، بر
            اساس آن برنامه محتوایی می‌دهد و به شما اجازه می‌دهد بین دو مدل هوش
            مصنوعی برای تولید محتوا انتخاب کنید.
            <br />
            نه فقط یک AI، بلکه یک انتخاب هوشمند
          </p>
        </Transition>
        <div
          class="mt-6 flex items-center gap-x-5 md:flex-row flex-col gap-y-3 lg:w-max w-full mb-10 lg:mb-0"
        >
          <Transition name="slide-fade" appear>
            <div style="animation-delay: 1s" class="w-full">
              <NuxtLink
                v-show="mounted"
                to="/chat"
                class="bg-linear-to-r min-w-max w-full lg:w-[350px] from-purple-600 justify-center to-pink-600 transition-all duration-300 hover:opacity-70 text-white px-3 py-4 rounded-xl text-sm font-light cursor-pointer flex items-center gap-x-1"
              >
                <Icon name="mdi:instagram" size="20px" />
                شروع رایگان
              </NuxtLink>
            </div>
          </Transition>
          <Transition name="fade" appear>
            <NuxtLink
              to="/pricing"
              v-show="mounted"
              style="animation-delay: 1s"
              class="px-3 py-4 bg-white w-full rounded-xl border border-gray-300 text-sm font-light cursor-pointer text-center"
            >
              قیمت ها
            </NuxtLink>
          </Transition>
        </div>
      </div>
      <!-- Left Side -->
      <div class="flex-1 md:p-6 mb-4 flex items-center justify-center">
        <Transition name="fade" appear>
          <NuxtImg
            src="/preview-1.png"
            style="animation-delay: 0.7s"
            v-show="mounted"
            alt="instagram-caption-generator-preview"
            class="max-w-[470px] max-h-[580px] w-[360px] md:w-[470px] p-6 lg:p-2"
          />
        </Transition>
      </div>
    </section>
    <!-- Perks and Points Section -->
    <section
      class="w-full min-h-[450px] bg-slate-50 flex flex-col p-6 relative"
    >
      <h2 class="w-full text-center mt-6 font-bold text-2xl lg:text-3xl">
        یک پلتفرم، دو هوش مصنوعی، بی‌نهایت محتوا
      </h2>
      <p class="text-gray-600 w-full text-center mt-4 text-sm">
        هوش مصنوعی ما برند شما رو بررسی میکنه و بهتون کمک میکنه تا دیده بشید
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

              <p class="w-full mt-4 text-center text-xl mb-3">
                {{ box.title }}
              </p>
              <p
                class="w-full lg:w-7/12 mt-2 text-center text-gray-600 text-sm text-balance"
              >
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
          <NuxtImg
            src="/logo-2.png"
            alt="captionsaz-logo"
            class="w-[150px] h-[150px] object-contain"
          />
        </div>
        <div class="w-full text-center border-b border-gray-200 min-h-[200px]">
          <h2 class="font-bold mb-2">آماده صرفه جویی در ساعت ها زمان؟</h2>
          <p class="text-gray-600 mb-10">
            به صد ها تولید کننده محتوا بپیوندید و همین حالا برای خودتون بهترین
            ادمین ممکن رو استخدام کنید
          </p>
          <NuxtLink
            to="/chat"
            class="py-2 px-4 bg-linear-to-r from-purple-600 to-pink-600 rounded-xl text-white mx-4"
          >
            شروع رایگان
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
            <p>محتوا تولید شده</p>
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
useHead({
  title: "تولید محتوا و برنامه‌ریزی هوشمند",
  meta: [
    {
      name: "description",
      content: `کپشن‌ساز یک پلتفرم مدیریت اینستاگرام با هوش مصنوعی است
که با امکان سوییچ بین GPT و Gemini،
تحلیل پیج و برنامه‌ریزی محتوا،
به رشد حرفه‌ای پیج شما کمک می‌کند.`,
    },
    {
      property: "og:title",
      content:
        "کپشن‌ساز — تولید کپشن برای نمایش در اکسپلور اینستاگرام و سایر شبکه های مجازی",
    },
    {
      property: "og:description",
      content:
        "کپشن‌ساز به شما کمک می‌کند کپشن‌های جذاب و ترند بسازید تا پست‌های شما مخاطب بیشتری جذب کنند.",
    },
    { property: "og:url", content: "https://captionsaz.ir/" },
  ],
  link: [{ rel: "canonical", href: "https://captionsaz.ir/" }],
});

const observerTarget = ref(null);
const mounted = ref(false);
const observerRoot = ref(null);
const { isVisible } = useObserver(observerTarget, {
  threshold: 0.2,
  root: observerRoot.value,
  once: true,
});

// This block is used to handel the mismatch on SSR and cSR
onMounted(() => {
  setTimeout(() => {
    mounted.value = true;
  }, 100);
});

const boxesData = [
  {
    title: "انتخاب هوش مصنوعی",
    description: `بین GPT و Gemini جابجا شوید و
بر اساس لحن، خلاقیت یا دقت،
مدل مناسب محتوای خود را انتخاب کنید.`,
    icon: "icon-park-outline:write",
  },
  {
    title: "تحلیل پیج و استراتژی محتوا",
    description: `
    با بررسی پیج اینستاگرام شما،
بهترین نوع پست، زمان انتشار
و سبک محتوا پیشنهاد می‌شود.
`,
    icon: "lets-icons:setting-vert",
  },
  {
    title: "تولید محتوای آماده انتشار",
    description: `کپشن، هشتگ و به‌زودی صدا (TTS)،
همه در یک جریان هوشمند.`,
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
