<template>
  <div class="flex items-center flex-col">
    <div
      class="w-full lg:w-[90%] mb-8 text-sm text-gray-500 flex items-center justify-between gap-x-4 bg-white rounded-xl p-3 flex-col lg:flex-row gap-y-3"
    >
      <div>
        <p><span>موضوع : </span> {{ ticketStore.currentTicket.subject }}</p>
      </div>
      <div class="flex items-center gap-x-3">
        <p>
          <Tag
            :color="
              ticketStore.currentTicket.priority === 'low'
                ? 'blue'
                : ticketStore.currentTicket.priority === 'medium'
                  ? 'yellow'
                  : 'red'
            "
            :text="
              ticketStore.currentTicket.priority === 'low'
                ? 'اولیوت : پایین'
                : ticketStore.currentTicket.priority === 'medium'
                  ? 'اولویت : معمولی'
                  : 'اولویت : بالا'
            "
          />
        </p>
        <p>
          <Tag
            :color="
              ticketStore.currentTicket.status === 'open'
                ? 'green'
                : ticketStore.currentTicket.status === 'pending'
                  ? 'yellow'
                  : ticketStore.currentTicket.status === 'resolved'
                    ? 'blue'
                    : 'red'
            "
            :text="
              ticketStore.currentTicket.status === 'open'
                ? 'باز'
                : ticketStore.currentTicket.status === 'pending'
                  ? 'در انتظار'
                  : ticketStore.currentTicket.status === 'resolved'
                    ? 'پاسخ داده شده'
                    : 'بسته شده'
            "
          />
        </p>
      </div>
      <div>
        <button
          @click="closeTicket"
          v-show="ticketStore.currentTicket.status !== 'closed'"
          class="py-2 px-4 bg-linear-to-r from-purple-600 to-pink-600 rounded-xl text-white mx-4 transition-all duration-300 hover:opacity-70 cursor-pointer"
        >
          بستن تیکت
        </button>
      </div>
    </div>
    <div class="w-full flex items-center justify-center flex-col">
      <div class="w-full lg:w-[90%] bg-white rounded-xl p-4 min-h-[70vh]">
        <div
          class="min-h-[50vh] max-h-[50vh] overflow-y-scroll"
          ref="chatContainer"
        >
          <template
            v-for="(message, index) in ticketStore.currentTicket.messages"
            :key="index"
          >
            <ChatBubble :message="message" class="mb-6" />
          </template>
        </div>

        <!-- Reply-input -->
        <div
          class="w-full border-t border-gray-300 min-h-[15vh] flex items-center justify-center gap-x-4 flex-col lg:flex-row"
        >
          <!-- Attachment button(Later) -->
          <!-- Input -->
          <div
            class="w-full rounded-xl border border-gray-200 p-4 my-4 lg:my-0"
          >
            <input
              type="text"
              placeholder="پیام خود را بنویسید ... "
              class="w-full focus:outline-0"
              v-model="inputValue"
              :disabled="ticketStore.currentTicket.status === 'closed'"
            />
          </div>
          <!-- Send button -->
          <div class="w-full lg:w-max">
            <button
              @click="sendReply"
              class="py-4 px-5 bg-linear-to-r from-purple-600 flex items-center justify-center gap-x-1 to-pink-600 rounded-xl text-white mx-0 lg:mx-4 transition-all duration-300 hover:opacity-70 cursor-pointer w-full lg:w-max"
            >
              <Icon name="tabler:send" size="24px" />
              ارسال
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
  layout: "ticket",
});
const ticketStore = useTicketStore();
const toastStore = useToastStore();
const route = useRoute();
const { chatContainer, onMessageAdded } = useChatScroll();

const inputValue = ref("");

onMounted(async () => {
  await ticketStore.getCurrentTicket(route.params.id);
});

const sendReply = async () => {
  if (inputValue.value.length >= 1) {
    try {
      await ticketStore.sendReplyToTicket(inputValue.value, route.params.id);
      inputValue.value = "";
      onMessageAdded();
    } catch (error) {
      toastStore.addToast(
        "error",
        "مشکلی در ارسال پیام پیش آمد مجددا تلاش کنید",
      );
    }
  } else {
    toastStore.addToast("error", "لطفا پیام خود را بنویسید");
  }
};

const closeTicket = async () => {
  try {
    ticketStore.closeTicket(route.params.id);
  } catch (error) {
    toastStore.addToast("error", error.message);
  }
};
</script>
