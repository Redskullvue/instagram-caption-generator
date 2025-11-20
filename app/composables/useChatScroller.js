import { ref, nextTick } from "vue";

export function useChatScroll() {
  const chatContainer = ref(null);

  const scrollToBottom = async () => {
    await nextTick();
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  };

  const onMessageAdded = () => scrollToBottom();

  return {
    chatContainer,
    scrollToBottom,
    onMessageAdded,
  };
}
