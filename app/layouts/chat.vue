<template>
  <div
    class="w-full h-screen flex justify-center items-center overflow-x-hidden"
  >
    <div
      class="w-full flex justify-start min-h-screen h-screen flex-col p-1 bg-linear-to-r from-purple-600 to-pink-600"
    >
      <div
        class="w-full bg-linear-to-r from-purple-600 to-pink-600 min-h-[90px] flex items-center rounded-tr-xl flex-col rounded-tl-xl p-4"
      >
        <div class="w-full text-white flex items-center gap-x-2">
          <Icon name="mingcute:ai-fill" size="30px" />
          <h2 class="font-bold">کپشن ساز</h2>
        </div>
        <p class="text-sm text-white w-full text-start mt-2">
          در چند ثانیه کپشن جذاب بسازید
        </p>
      </div>
      <button
        class="absolute left-4 top-10 lg:hidden text-white"
        @click="showMenu"
      >
        <Icon name="stash:burger-classic" size="24px" />
      </button>
      <Transition name="slideInRight" appear>
        <div
          v-if="toggleMenu"
          class="fixed inset-0 z-50 backdrop-blur-lg lg:pointer-events-none lg:backdrop-blur-none"
        >
          <button
            @click="toggleMenu = false"
            class="flex items-center gap lg:hidden px-2 py-1 rounded-lg text-white"
          >
            <Icon name="zondicons:close-solid" size="24px" class="mt-4" />
          </button>
          <div
            class="absolute left-0 top-0 h-full w-84 lg:w-80 bg-white shadow-lg lg:pointer-events-auto"
          >
            <SideBarMenu @close-menu="closeMenu" />
          </div>
        </div>
      </Transition>

      <div
        class="w-full lg:flex lg:justify-center h-full bg-linear-to-r from-purple-600 to-pink-600 p-1"
      >
        <div
          class="w-full lg:w-6/12 bg-white lg:shadow-md shadow-gray-500 rounded-lg lg:rounded-xl h-full py-4 px-2"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const toggleMenu = ref(false);

// Check if window is bigger than 1024px set toggleMenu to true

onMounted(() => {
  const width = window.innerWidth;
  if (width >= 1024) {
    toggleMenu.value = true;
  }
});

const closeMenu = (val) => {
  toggleMenu.value = val;
};
const showMenu = () => {
  toggleMenu.value = true;
};
</script>
<style>
@keyframes SlideInRight {
  from {
    transform: translate3d(-25%, 0, 0);
    visibility: visible;
    opacity: 0;
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
/* When entering */
.slideInRight-enter-active {
  animation: SlideInRight 0.5s ease forwards;
}

/* When leaving */
.slideInRight-leave-active {
  animation: SlideInRight 0.5s ease reverse;
}
</style>
