export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();
  const usageStore = useUsageStore();

  // Hydrate auth first
  authStore.hydrate();

  // Then hydrate usage if authenticated
  if (authStore.token) {
    await usageStore.hydrate();
  }
});
