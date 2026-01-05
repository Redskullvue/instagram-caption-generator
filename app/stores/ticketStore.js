import { defineStore } from "pinia";

export const useTicketStore = defineStore("ticketStore", () => {
  const authStore = useAuthStore();
  const toastStore = useToastStore();
  // States
  const allTickets = ref([]);

  //Getters (Computed)
  const totalOpenTickets = computed(() => {
    let openTickets = allTickets.value.filter(
      (ticket) => ticket.status === "open"
    );
    return openTickets.length;
  });

  const totalClosedTickets = computed(() => {
    let closedTickets = allTickets.value.filter(
      (ticket) => ticket.status === "closed"
    );
    return closedTickets.length;
  });

  const totalResolvedTickets = computed(() => {
    let resolvedTickets = allTickets.value.filter(
      (ticket) => ticket.status === "resolved"
    );
    return resolvedTickets.length;
  });
  // Actions
  const getAllTickets = async () => {
    try {
      const response = await $fetch("/api/tickets", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      allTickets.value = [...response.tickets];
    } catch (error) {
      toastStore.addToast("error", " خطا در دریافت اطلاعات");
      throw new Error("خطا در دریافت اطلاعات");
    }
  };

  return {
    // States
    allTickets,
    // Getters
    totalOpenTickets,
    totalClosedTickets,
    totalResolvedTickets,
    // Actions
    getAllTickets,
  };
});
