import { defineStore } from "pinia";

export const useUsageStore = defineStore("usageStore", () => {
  const authStore = useAuthStore();
  //States
  const usage = ref({
    promptsUsed: 0,
    promptsLimit: 5,
    resetDate: null,
  });
  const isLoading = ref(false);
  //Getters(computed)
  const promptsRemaining = computed(() => {
    return Math.max(0, usage.value.promptsLimit - usage.value.promptsUsed);
  });
  //   Returns Boolean
  const hasPromptsLeft = computed(() => {
    return promptsRemaining.value > 0;
  });
  const fetchUsage = async () => {
    isLoading.value = true;
    try {
      const response = await $fetch("/api/usage", {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      usage.value = response;
    } catch (error) {
      authStore.logOut();
    } finally {
      isLoading.value = false;
    }
  };

  const incrementUsage = async () => {
    try {
      const response = await $fetch("/api/usage/increment", {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
        method: "POST",
      });

      usage.value = response;
    } catch (error) {
      throw new Error(error.data.message);
    }
    if (!hasPromptsLeft.value) {
      throw new Error("No Prompts Remaining");
    }
  };

  const hydrate = async () => {
    if (authStore.isAuthenticated) {
      await fetchUsage();
    }
  };
  return {
    usage,
    isLoading,
    promptsRemaining,
    hasPromptsLeft,
    fetchUsage,
    incrementUsage,
    hydrate,
  };
});
