export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();
  const usageStore = useUsageStore();
  const chatStore = useChatStore();
  const planStore = usePlanStore();
  // Hydrate auth first
  authStore.hydrate();

  // Then hydrate usage if authenticated
  if (authStore.token) {
    await Promise.all([
      usageStore.hydrate(),
      chatStore.hydrate(),
      planStore.hydrate(),
    ]);
  }
});
