<template>
  <div class="w-full flex flex-col bg-pink-100 p-3">
    <div class="w-full flex flex-col">
      <!-- Avatar -->
      <div class="w-full flex items-center gap-x-3">
        <div
          class="w-10 h-10 rounded-full bg-linear-to-r from-purple-600 to-pink-600 flex items-center justify-center"
        >
          <Icon name="mdi:user-outline" size="25px" class="text-white" />
        </div>
        <div>
          <p>{{ authStore.user.name }}</p>
          <p class="text-xs mt-0.5">{{ authStore.user.email }}</p>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center gap-x-2 mt-4 text-xs">
      <div class="px-1 flex flex-col items-center">
        <p v-if="usageStore.usage.promptsLimit !== null">
          {{ usageStore.promptsRemaining }} /
          {{ usageStore.usage.promptsLimit }}
        </p>
        <p v-if="usageStore.usage.promptsLimit === null">
          {{ usageStore.promptsRemaining }} / بی نهایت
        </p>
        <small>درخواست ها</small>
      </div>
      <div class="border-l border-r px-3 flex flex-col items-center">
        {{ faDate }}
        <small> تاریخ شارژ </small>
      </div>
      <div class="px-1 flex flex-col items-center">
        {{ authStore.user.plan }}
        <small>اشتراک</small>
      </div>
    </div>
  </div>
</template>

<script setup>
const usageStore = useUsageStore();
const authStore = useAuthStore();
// Changind Date to persian Calender
const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  calendar: "persian",
};
const date = new Date(usageStore.usage.resetDate);
const faDate = date.toLocaleDateString("fa-IR", options);
</script>
