<template>
  <div
    class="w-full border border-gray-300 rounded-xl h-28 p-4 flex items-center gap-y-4 transition-all duration-300 cursor-pointer"
    :class="currentPlan === plan.title ? 'bg-purple-100' : ''"
    @click="$emit('selectedPlan', plan)"
  >
    <!-- Plan Icon -->
    <div>
      <img
        :src="plan.image"
        alt="planImage"
        class="lg:w-[110px] lg:h-[110px] w-20 h-20 object-contain"
      />
    </div>
    <!-- Plan Info -->
    <div class="flex flex-col items-center gap-y-2">
      <p>{{ plan.title }}</p>
      <p>{{ plan.price }} / ماه</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["plan", "currentPlan"]);
const emits = defineEmits(["selectedPlan"]);
</script>
