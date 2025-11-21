import { useAuthStore } from "@/stores/authStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();
  const protectedRoutes = ["/chat"];
  // Only run hydration on client side
  if (import.meta.server) {
    return;
  }
  auth.hydrate();
  if (protectedRoutes.includes(to.fullPath) && auth.isAuthenticated) {
    return;
  } else if (protectedRoutes.includes(to.fullPath) && !auth.isAuthenticated) {
    return navigateTo("/login");
  }
});
