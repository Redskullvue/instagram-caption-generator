<template>
  <div class="w-full flex flex-col items-center">
    <header class="w-full 2xl:w-[90%]">
      <TicketsLayoutHeader />
    </header>
    <!-- Slot -->
    <main class="w-full min-h-screen bg-pink-50 2xl:p-10 p-2">
      <slot />
    </main>
  </div>
</template>

<script setup></script>
