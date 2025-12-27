// middleware/plan.js
import { useAuthStore } from "@/stores/authStore";

export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  const toastStore = useToastStore();

  if (import.meta.server) {
    return;
  }

  // ✅ Check if user has premium plan
  if (authStore.user?.plan === "Free") {
    toastStore.addToast(
      "error",
      "در پلن رایگان دسترسی به این بخش امکان پذیر نمیباشد"
    );
    return navigateTo({
      path: "/upgrade",
      query: {
        message: "این صفحه فقط برای کاربران پرمیوم در دسترس است",
        from: to.path, // Track where they tried to go
      },
    });
  }
});
