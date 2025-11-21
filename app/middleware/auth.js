import { useAuthStore } from "@/stores/authStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore();
  if (!auth.isAuthenticated) {
    return navigateTo("/login");
  }
  if (auth.isAuthenticated) {
    return navigateTo("/chat");
  }
});
