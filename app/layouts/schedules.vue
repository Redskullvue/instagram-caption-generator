<template>
  <div class="w-full flex flex-col items-center">
    <header class="w-full 2xl:w-[90%]">
      <SchedulesHeader />
    </header>
    <!-- Slot -->
    <main class="w-full h-max bg-pink-50 2xl:p-10 p-2">
      <slot />
    </main>
  </div>
</template>

<script setup></script>
