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

  //Actions
  const getPlanLimit = (plan) => {
    const limits = {
      free: 5,
      pro: 50,
      enterprise: Infinity,
    };
    return limits[plan] || 5;
  };

  const fetchUsage = async () => {
    isLoading.value = true;

    try {
      // instead of API this is the fake logic
      await new Promise((r) => setTimeout(r, 500));
      usage.value = {
        promptsUsed: 0,
        promptsLimit: getPlanLimit("free"),
        resetDate: null,
      };
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  };

  const incrementUsage = async () => {
    if (!hasPromptsLeft.value) {
      throw new Error("No Prompts Remaining");
    }

    // Fake Logic | Replace with API Later
    usage.value.promptsUsed++;
  };

  const hydrate = () => {
    if (authStore.isAuthenticated) {
      fetchUsage();
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
