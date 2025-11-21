import { useAuthStore } from "@/stores/authStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();
  if (import.meta.server) {
    return;
  }
  const protectedRoutes = ["/chat"];
  if (protectedRoutes.includes(to.fullPath) && auth.isAuthenticated) {
    return;
  } else if (protectedRoutes.includes(to.fullPath) && !auth.isAuthenticated) {
    return navigateTo("/login");
  }
});
