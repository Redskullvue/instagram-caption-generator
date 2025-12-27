import { defineStore } from "pinia";

export const usePlanStore = defineStore("planstore", () => {
  // Other Stores
  const authStore = useAuthStore();
  const toastStore = useToastStore();

  // States
  const allPlans = ref([]);
  const currentPlan = ref(null);

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

  const currentPlanHighPriorityList = computed(() => {
    const schedule = currentPlan.value?.schedule ?? [];
    const list = schedule.filter((day) => day.priority === "high");
    return list.length || 0;
  });
  const currentPlanHashtagList = computed(() => {
    const schedule = currentPlan.value?.schedule ?? [];
    const list = [];
    schedule.forEach((day) => {
      // Just mutating the same array here instead of reassign using concat
      list.push(...day.hashtags);
    });

    return list;
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

  const getSinglePlan = async (planId) => {
    try {
      const response = await $fetch(`/api/planner/${planId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      currentPlan.value = response.plan;
    } catch (error) {
      throw new Error("خطا در ارتباط با سرور");
    }
  };

  const deletePlan = async (planId) => {
    try {
      const response = await $fetch(`/api/planner/${planId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      });
      const planIndex = allPlans.value.findIndex((plan) => plan.id === planId);
      if (planIndex !== -1) {
        allPlans.value.splice(planIndex, 1);
      }
      return true;
    } catch (error) {
      toastStore.addToast("error", error.message);
      throw new Error("خطا در ارتباط با سرور");
    }
  };

  const hydrate = async () => {
    if (authStore.isAuthenticated) {
      await getAllPlans();
    }
  };

  //This function will recive an index from /schedules/[id] to return the days tasks
  const taskSorter = (index) => {
    let day = currentPlan.value.schedule.filter(
      (item) => item.dayNumber === index
    );
    return day;
  };

  return {
    // States
    allPlans,
    currentPlan,
    //Computed(Getters)
    totalPostsEver,
    totalStoriesEver,
    completedPlans,
    currentPlanHighPriorityList,
    currentPlanHashtagList,
    // Actions
    getAllPlans,
    getSinglePlan,
    deletePlan,
    taskSorter,
    hydrate,
  };
});
