export default defineNuxtPlugin(() => {
  const authStore = useAuthStore();
  const usageStore = useUsageStore();

  // Hydrate auth first
  authStore.hydrate();

  // Then hydrate usage if authenticated
  if (authStore.isAuthenticated) {
    usageStore.hydrate();
  }
});
