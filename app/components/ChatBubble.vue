<template>
  <div
    class="w-max max-w-[90%] lg:min-h-[70px] mt-4 p-3 rounded-xl min-h-[10] shadow-md shadow-gray-500 flex items-center justify-center"
    :class="
      message.isUser
        ? 'ml-auto bg-linear-to-r  from-purple-600 to-pink-600 text-white'
        : 'mr-auto bg-gray-200'
    "
  >
    {{ message.text }}
  </div>
</template>

<script setup>
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
</script>
