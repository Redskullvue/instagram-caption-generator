import { defineStore } from "pinia";

export const useTicketStore = defineStore("ticketStore", () => {
  const authStore = useAuthStore();
  const toastStore = useToastStore();
  // States
  const allTickets = ref([]);
  const currentTicket = ref({});
  const isTicketLoading = ref(false);

  //Getters (Computed)
  const totalOpenTickets = computed(() => {
    let openTickets = allTickets.value.filter(
      (ticket) => ticket.status === "open",
    );
    return openTickets.length;
  });

  const totalClosedTickets = computed(() => {
    let closedTickets = allTickets.value.filter(
      (ticket) => ticket.status === "closed",
    );
    return closedTickets.length;
  });

  const totalResolvedTickets = computed(() => {
    let resolvedTickets = allTickets.value.filter(
      (ticket) => ticket.status === "resolved",
    );
    return resolvedTickets.length;
  });
  // Actions
  const getAllTickets = async () => {
    isTicketLoading.value = true;
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
    } finally {
      isTicketLoading.value = false;
    }
  };

  const getCurrentTicket = async (id) => {
    const cachedTicket = allTickets.value.find((item) => item._id === id);

    if (cachedTicket) {
      currentTicket.value = cachedTicket;
    }
    try {
      const response = await $fetch(`/api/tickets/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      currentTicket.value = response.ticket;
      return currentTicket.value;
    } catch (error) {
      toastStore.addToast("error", " خطا در دریافت اطلاعات");
      throw new Error("خطا در دریافت اطلاعات");
    }
  };

  const sendReplyToTicket = async (text, ticketId) => {
    currentTicket.value.messages.push({
      senderType: "user",
      text: text,
    });

    try {
      const response = await $fetch(`/api/tickets/${ticketId}/reply`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
        body: {
          role: "user",
          message: text,
        },
      });
      if (response.success) {
        currentTicket.value = response.ticket;
      }
    } catch (error) {
      throw new Error("خطا در برقراری ارتباط با سرور");
    }
  };

  const closeTicket = async (ticketId) => {
    try {
      const response = await $fetch(`/api/tickets/${ticketId}/updatestatus`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
        body: {
          status: "closed",
        },
      });
      if (response.success) {
        toastStore.addToast("success", "نیکت بسته شد");
        currentTicket.value = response.ticket;
      }
    } catch (error) {
      throw new Error("خطا در برقراری ارتباط با سرور");
    }
  };

  return {
    // States
    allTickets,
    currentTicket,
    // Getters
    totalOpenTickets,
    totalClosedTickets,
    totalResolvedTickets,
    // Actions
    getAllTickets,
    getCurrentTicket,
    sendReplyToTicket,
    closeTicket,
  };
});
