<template>
  <div class="w-full bg-white rounded-xl p-6 shadow-md shadow-gray-200">
    <form @submit.prevent="submit">
      <label class="text-sm text-gray-700"
        >عنوان تیکت <span class="text-red-500">*</span></label
      >
      <div class="w-full rounded-xl border border-gray-300 p-3 my-3">
        <input
          type="text"
          v-model="titleInput"
          placeholder="عنوان واضح و کوتاه برای تیکت"
          class="w-full focus:outline-0"
        />
      </div>
      <label for="priority" class="text-sm text-gray-700">اولویت</label>
      <div class="w-full my-4 rounded-xl border border-gray-300 p-3">
        <select
          name="priority"
          :disabled="authStore.user.plan === 'Free'"
          id="priority"
          class="w-full disabled:opacity-30 disabled:border-gray-100"
          @change="setPriority"
        >
          <option :value="null">انتخاب کنید</option>
          <option value="low">پایین</option>
          <option value="medium">متوسط</option>
          <option value="high">بالا</option>
        </select>
      </div>
      <label for="ticket" class="text-sm text-gray-700"
        >توضیحات کامل <span class="text-red-500">*</span></label
      >
      <div
        class="w-full my-4 rounded-xl border border-gray-300 p-3 min-h-[150px]"
      >
        <textarea
          class="w-full min-h-[150px] focus:outline-0"
          name="ticket"
          v-model="descriptionInput"
          id="ticket"
          placeholder="سوال و یا مشکل خود را به صورت کامل در این قسمت بنویسید"
        ></textarea>
      </div>
      <div
        class="w-full flex items-center justify-center flex-col lg:flex-row gap-y-4"
      >
        <button
          :disabled="isSendingRequest"
          class="py-4 px-5 bg-linear-to-r from-purple-600 flex items-center justify-center gap-x-1 to-pink-600 rounded-xl text-white mx-0 lg:mx-4 transition-all duration-300 hover:opacity-70 cursor-pointer w-full disabled:opacity-50"
        >
          <Icon name="tabler:send" size="24px" />
          ارسال تیکت
        </button>
        <button
          @click.prevent="clearForm"
          class="w-full lg:w-1/3 py-4 px-5 rounded-xl border border-gray-300 cursor-pointer"
        >
          پاک کردن فرم
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
const authStore = useAuthStore();
const ticketStore = useTicketStore();
const toastStore = useToastStore();

const titleInput = ref("");
const priorityInput = ref(null);
const descriptionInput = ref("");
const isSendingRequest = ref(false);

const setPriority = (val) => {
  priorityInput.value = val.target.value;
};

const submit = async () => {
  isSendingRequest.value = true;
  try {
    await ticketStore.submitTicket({
      subject: titleInput.value,
      priority: priorityInput.value,
      message: descriptionInput.value,
    });
  } catch (error) {
    toastStore.addToast("error", error.message);
  } finally {
    isSendingRequest.value = false;
  }
};

const clearForm = () => {
  titleInput.value = "";
  priorityInput.value = null;
  descriptionInput.value = "";
};
</script>
