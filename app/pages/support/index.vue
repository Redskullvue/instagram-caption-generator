<template>
  <div class="w-full h-full flex justify-center">
    <div class="w-full 2xl:w-[90%] h-full">
      <ClientOnly>
        <div
          class="w-full grid grid-cols-1 lg:grid-cols-4 gap-x-4 gap-y-5 mt-4"
        >
          <ScheduleMetadataBox
            v-for="(box, index) in ticketBoxes"
            :key="index"
            :title="box.title"
            :icon="box.icon"
            :value="box.value"
          />
        </div>
      </ClientOnly>
      <!--Tickets -->
      <ClientOnly>
        <div class="w-full grid grid-cols-1 mt-15 gap-x-4 gap-y-8">
          <template
            v-for="(ticket, index) in ticketStore.allTickets"
            :key="index"
          >
            <TicketCard :data="ticket" />
          </template>
          <div
            class="flex items-center justify-center flex-col gap-y-4 col-span-4"
            v-if="ticketStore.allTickets.length <= 0"
          >
            <p class="w-full text-center">هنوز تیکتی ایجاد نشده</p>
            <NuxtLink
              to="/chat"
              class="rounded-xl bg-purple-500 py-2 px-4 text-white flex items-center gap-x-1"
            >
              ایجاد تیکت
              <Icon name="ic:outline-plus" size="24px" />
            </NuxtLink>
          </div>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
  layout: "ticket",
});

const ticketStore = useTicketStore();

onMounted(async () => {
  await ticketStore.getAllTickets();
});

const ticketBoxes = computed(() => [
  {
    title: "کل تیکت ها",
    icon: "ant-design:rise-outlined",
    value: ticketStore.allTickets.length,
  },
  {
    title: "تیکت های باز",
    icon: "majesticons:open",
    value: ticketStore.totalOpenTickets,
  },
  {
    title: "پاسخ داده شده",
    icon: "mdi:progress-clock",
    value: ticketStore.totalResolvedTickets,
  },
  {
    title: "  بسته شده",
    icon: "lets-icons:done-ring-round",
    value: ticketStore.totalClosedTickets,
  },
]);
</script>
