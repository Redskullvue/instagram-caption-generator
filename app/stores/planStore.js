import { defineStore } from "pinia";

export const usePlanStore = defineStore("planstore", () => {
  // Other Stores
  const authStore = useAuthStore();
  const toastStore = useToastStore();

  // States
  const allPlans = ref([]);

  //Getters
  const totalPostsEver = computed(() => {
    let totalPosts = 0;
    allPlans.value.forEach((plan) => {
      totalPosts += plan.totalPosts;
    });
    return totalPosts;
  });

  const totalStoriesEver = computed(() => {
    let totalStories = 0;
    allPlans.value.forEach((plan) => {
      totalStories += plan.contentType?.story;
    });
    return totalStories;
  });

  const completedPlans = computed(() => {
    let completedPlans = 0;
    allPlans.value.forEach((plan) => {
      if (plan.completedPosts === plan.totalPosts) {
        completedPlans += 1;
      }
    });
    return completedPlans;
  });

  //Actions
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
    //Computed(Getters)
    totalPostsEver,
    totalStoriesEver,
    completedPlans,
    // Actions
    getAllPlans,
    hydrate,
  };
});
