<template>
  <div class="w-full h-max">
    <div
      class="w-full flex items-center gap-x-3"
      @click="
        width > 1024
          ? (showMediaSelector = true)
          : (showMediaSelector = !showMediaSelector)
      "
    >
      <p class="text-sm text-gray-800">انتخاب پلتفرم :</p>
      <p
        class="text-xs text-gray-600 lg:hidden bg-gray-100 rounded-xl px-3 py-2"
      >
        {{ socials[mediaIndex].title }}
      </p>
      <i
        class="lg:hidden flex items-center justify-center transition-all duration-300"
        :class="showMediaSelector ? 'rotate-180' : 'rotate-0'"
      >
        <Icon name="mdi-light:chevron-down" size="20px" />
      </i>
    </div>

    <div
      class="w-full min-h-5 grid grid-cols-2 mt-2 text-sm"
      v-if="showMediaSelector"
    >
      <button
        class="m-1 rounded-xl cursor-pointer py-3 transition-colors duration-300 shadow-sm shadow-gray-300"
        :class="
          selectedMedia === social.value
            ? 'bg-linear-to-r from-purple-600 to-pink-600 text-white'
            : 'bg-gray-100 text-gray-700'
        "
        v-for="(social, index) in socials"
        :key="index"
        @click="setTone(social.value, index)"
      >
        {{ social.title }}
      </button>
    </div>
  </div>
</template>

<script setup>
const width = window.innerWidth;
const emits = defineEmits(["selectSocial"]);
const selectedMedia = ref("instagram");
const socials = ref([
  { title: "اینستاگرام", value: "instagram" },
  { title: "تیک تاک", value: "tiktok" },
  { title: "یوتیوب", value: "youtube" },
  { title: "لینکداین", value: "linkedin" },
]);
// To show users what has been selected already
const mediaIndex = ref(0);
// Show or not show the selection in mobile for better UX
const showMediaSelector = ref(false);
onMounted(() => {
  if (width > 1024) {
    showMediaSelector.value = true;
  }
});

// Set the tone
const setTone = (value, index) => {
  if (value) {
    selectedMedia.value = value;
    mediaIndex.value = index;
    emits("selectSocial", selectedMedia.value);
    if (width < 1024) {
      showMediaSelector.value = false;
    }
    return;
  }
};
</script>
