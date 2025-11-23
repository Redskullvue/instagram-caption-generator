import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", () => {
  // Auth States
  const user = ref(null);
  const token = useCookie("auth_token");
  // Computed(Getters)
  const isAuthenticated = computed(() => !!token.value);

  //Actions
  const fakeLogin = async (email, password) => {
    await new Promise((response) => setTimeout(response, 500));
    user.value = { id: 1, email: email, password: password };
    token.value = "FAKE_TOKEN_123";

    localStorage.setItem("token", token.value);
    localStorage.setItem("user", JSON.stringify(user.value));
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

  const fakeLogout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  // reloads the auth state from localStorage and puts it back into Pinia.
  const hydrate = () => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");

    if (t) token.value = t;
    if (u) user.value = JSON.parse(u);
  };

  return {
    user,
    token,
    isAuthenticated,
    fakeLogin,
    signUp,
    fakeLogout,
    hydrate,
  };
});
