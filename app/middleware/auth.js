import { useAuthStore } from "@/stores/authStore";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  if (import.meta.server) {
    return;
  }
  const protectedRoutes = ["/chat", "/upgrade", "/schedules"];
  // Check if the path starts with any protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    to.path.startsWith(route)
  );
  if (!isProtectedRoute) {
    return;
  }
  if (!authStore.token) {
    return navigateTo("/login");
  }

  try {
    const response = await $fetch("/api/auth/validate", {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    if (response.valid && response.user) {
      authStore.user = response.user;
    }
    return;
  } catch (error) {
    authStore.logOut();
    return navigateTo("/login");
  }
});
