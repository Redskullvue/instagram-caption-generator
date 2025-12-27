import { defineStore } from "pinia";

export const useToastStore = defineStore("toastStore", () => {
  const toasts = ref([]);

  const addToast = (type, message) => {
    const id = Date.now();
    toasts.value.push({
      id: id,
      message: message,
      type: type,
    });

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  };

  // Remove All Toasts together
  const clearToasts = () => {
    toasts.value = [];
  };

  return {
    toasts,
    addToast,
    removeToast,
    clearToasts,
  };
});
