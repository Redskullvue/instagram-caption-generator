<template>
  <div class="w-full">
    <div
      class="w-full border border-gray-400 py-3 px-4 rounded-xl flex gap-x-3"
    >
      <Icon name="mdi:search" size="30px" class="text-gray-500" />
      <input
        type="text"
        placeholder="جستجو در برنامه ها ..."
        v-model="searchInput"
        class="w-full focus:outline-0"
        @input="search"
      />
    </div>
    <div
      v-if="foundPlans !== undefined"
      class="w-full bg-white p-4 shadow-md shadow-gray-300 rounded-b-xl"
    >
      <div
        class="w-full rounded-xl border border-gray-300 p-3 my-2 flex items-center justify-between bg-linear-to-r from-purple-600 to-pink-600 text-white"
        v-for="(plan, index) in foundPlans"
        :key="index"
      >
        <p>
          {{ plan.title }}
        </p>
        <div>
          {{ formatDate(plan.createdAt) }}
        </div>
        <div>
          <NuxtLink
            :to="'/schedules/' + plan.id"
            class="py-2 px-3 rounded-xl bg-white text-gray-600 text-xs cursor-pointer transition-colors duration-300 hover:bg-gray-100"
          >
            مشاهده
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const planStore = usePlanStore();
const { formatDate } = useDateChanger();
const searchInput = ref("");
const foundPlans = ref(undefined);
const search = () => {
  if (searchInput.value === "") {
    foundPlans.value = undefined;
  }

  foundPlans.value = planStore.searchPlans(searchInput.value);
};
</script>
