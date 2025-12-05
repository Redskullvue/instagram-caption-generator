import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", () => {
  // Auth States
  const user = ref(null);
  const token = useCookie("auth_token");
  // Computed(Getters)
  const isAuthenticated = computed(() => !!token.value);

  //Actions
  const login = async (email, password) => {
    try {
      const response = await $fetch("/api/auth/login", {
        method: "POST",
        body: { email: email, password: password },
      });

      user.value = response.user;
      token.value = response.token;
      // Only Store User Data in local if we are not on server enviorment
      if (import.meta.client) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }
      return response;
    } catch (error) {
      throw new Error(error.data.message);
    }
  };

  const signUp = async (data) => {
    try {
      const response = await $fetch("/api/auth/signup", {
        method: "POST",
        body: data,
      });
      user.value = response.user;
      token.value = response.token;

      if (import.meta.client) {
        localStorage.setItem("user", JSON.stringify(user.value));
      }
      return response;
    } catch (error) {
      // The catch block will send error message to signup form
      throw new Error(error.data.message);
    }
  };

  const logOut = () => {
    user.value = null;
    token.value = null;

    if (import.meta.client) {
      localStorage.removeItem("user");
    }

    return navigateTo("/login");
  };

  const sendEmailForPassword = async (email) => {
    try {
      const response = await $fetch("/api/auth/forgot", {
        method: "POST",
        body: { email: email },
      });
    } catch (error) {
      throw new Error(error.data.message);
    }
  };

  const resetPassword = async (token, password, userId) => {
    try {
      const response = await $fetch("/api/auth/resetpass", {
        method: "POST",
        body: { newPassword: password, token: token, userId: userId },
      });
    } catch (error) {
      throw new Error(error.data.message);
    }
  };
  // reloads the auth state from localStorage and puts it back into Pinia.
  const hydrate = () => {
    if (import.meta.client && token.value) {
      const stored = localStorage.getItem("user");
      if (stored) user.value = JSON.parse(stored);
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    login,
    signUp,
    logOut,
    sendEmailForPassword,
    resetPassword,
    hydrate,
  };
});
