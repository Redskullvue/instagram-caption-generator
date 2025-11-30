<template>
  <div
    class="w-max max-w-[90%] whitespace-pre-line lg:min-h-[70px] mt-4 p-3 rounded-xl min-h-[10] shadow-md shadow-gray-400 flex items-center justify-center lg:text-sm"
    :class="
      message.isUser
        ? 'ml-auto bg-linear-to-r  from-purple-600 to-pink-600 text-white'
        : 'mr-auto bg-gray-100'
    "
  >
    <p v-if="!message.isUser">{{ display }}</p>
    <p v-if="message.isUser">{{ message.text }}</p>
  </div>
</template>

<script setup>
const display = ref("");
const props = defineProps({
  message: {
    type: Object,
    required: true,
    default: () => ({ text: "", isUser: false }),
    isUser: {
      type: Boolean,
      default: false,
    },
  },
});

onMounted(async () => {
  if (!props.message.isUser && props.message.shouldAnimate) {
    await typeLine(props.message.text, (chunk) => {
      display.value = chunk;
    });
  } else {
    display.value = props.message.text;
  }
});
</script>
