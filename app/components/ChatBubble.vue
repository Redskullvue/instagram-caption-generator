<template>
  <div
    class="w-max max-w-[90%] whitespace-pre-line lg:min-h-[70px] mt-4 p-3 rounded-xl min-h-[10] shadow-md shadow-gray-400 flex items-center justify-center lg:text-sm flex-col"
    :class="
      message.isUser || message.senderType === 'user'
        ? 'ml-auto bg-linear-to-r  from-purple-600 to-pink-600 text-white'
        : 'mr-auto bg-gray-100'
    "
  >
    <p
      v-if="!message.isUser && message.senderType !== 'user'"
      class="text-purple-800 text-start"
      v-html="display"
    ></p>
    <p v-if="message.isUser || message.senderType === 'user'">
      {{ message.text }}
    </p>
    <div class="relative group cursor-pointer">
      <img
        v-if="message.imageUrl"
        :src="message.imageUrl"
        @click="downloadImage(message.imageUrl)"
        alt="generateImage"
        class="min-w-[200px] min-h-[200px] rounded-xl object-contain hover:bg-blend-overlay max-h-[500px]"
      />
    </div>
  </div>
</template>

<script setup>
import { marked } from "marked";
import DOMPurify from "dompurify";
const display = ref("");
const props = defineProps({
  message: {
    type: Object,
    required: true,
    default: () => ({ text: "", isUser: false }),
    senderType: {
      type: String,
      default: "admin",
    },
    isUser: {
      type: Boolean,
      default: false,
    },
  },
});

function renderMarkdown(mdText) {
  const rawHtml = marked.parse(mdText); //Transforming the text
  return DOMPurify.sanitize(rawHtml); //Make the HTML safe
}

function downloadImage(url) {
  window.open(url, "_blank");
}

onMounted(async () => {
  if (!props.message.isUser && props.message.shouldAnimate) {
    await typeLine(props.message.text, (chunk) => {
      display.value = renderMarkdown(chunk);
    });
  } else {
    display.value = renderMarkdown(props.message.text);
  }
});
</script>
