<template>
  <div class="text-purple-500 cursor-pointer" @click="copyText">
    <Icon name="mingcute:copy-line" size="24px" v-if="!isCopied" />
    <Icon name="tabler:copy-check" size="23px" v-if="isCopied" />
  </div>
</template>

<script setup>
const props = defineProps({
  message: {
    type: String,
    default: "",
  },
});

const isCopied = ref(false);

const copyText = () => {
  navigator.clipboard.writeText(props.message);
  isCopied.value = true;
  setTimeout(() => {
    isCopied.value = false;
  }, 1800);
};
</script>
