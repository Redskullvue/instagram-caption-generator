import { defineStore } from "pinia";

export const usePlanStore = defineStore("planstore", () => {
  // Other Stores
  const authStore = useAuthStore();
  const toastStore = useToastStore();

  // States
  const allPlans = ref([]);

  //actions

  const getAllPlans = async () => {
    try {
      const userPlans = await $fetch("/api/planner/getall", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      allPlans.value = [...userPlans.plans];
    } catch (error) {
      toastStore.addToast("error", "مشکل در برقراری ارتباط با سرور");
      throw new Error("مشکل در دریافت برنامه ها");
    }
  };

  const hydrate = async () => {
    if (authStore.isAuthenticated) {
      await getAllPlans();
    }
  };
  return {
    // States
    allPlans,
    // Actions
    getAllPlans,
    hydrate,
  };
});
