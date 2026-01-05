<template>
  <div class="w-full rounded-xl bg-white border-2 border-purple-300 p-6">
    <div class="w-full flex gap-x-3">
      <!-- Icon -->
      <div class="mt-2">
        <Icon name="bx:support" size="40px" class="text-purple-500" />
      </div>
      <!-- Title and Subtitle -->
      <div class="w-full flex flex-col gap-y-3">
        <h2 class="font-bold text-gray-700">{{ data.subject }}</h2>
        <p class="text-sm text-gray-500">
          {{ data.messages[data.messages.length - 1].text.substring(0, 40) }}...
        </p>
      </div>
    </div>
    <!-- Tags -->
    <div
      class="w-full mb-4 mt-6 flex gap-x-2 border-b border-gray-300 pb-4 text-sm"
    >
      <Tag
        :color="
          data.status === 'open'
            ? 'green'
            : data.status === 'pending'
            ? 'yellow'
            : data.status === 'resolved'
            ? 'blue'
            : 'red'
        "
        :text="
          data.status === 'open'
            ? 'باز'
            : data.status === 'pending'
            ? 'در انتظار'
            : data.status === 'resolved'
            ? 'پاسخ داده شده'
            : 'بسته شده'
        "
      />
      <Tag
        :color="
          data.priority === 'low'
            ? 'blue'
            : data.priority === 'medium'
            ? 'yellow'
            : 'red'
        "
        :text="
          data.priority === 'low'
            ? 'اولیوت : پایین'
            : data.priority === 'medium'
            ? 'اولویت : معمولی'
            : 'اولویت : بالا'
        "
      />
    </div>

    <!-- Date & CTA -->
    <div class="w-full flex items-center justify-between flex-col lg:flex-row">
      <!-- Date -->
      <div
        class="w-full flex items-center gap-x-3 text-gray-500 text-sm justify-between lg:justify-start mb-4 lg:mb-0"
      >
        <p class="w-max">
          ایجاد شده در تاریخ : {{ formatDate(data.createdAt) }}
        </p>
        <p class="flex items-center gap-x-2">
          <Icon name="line-md:chat" size="20px" />
          {{ data.messages.length }} گفت گو
        </p>
      </div>
      <!-- CTA Button -->
      <NuxtLink
        :to="'/support/' + data._id"
        class="rounded-xl max-w-max lg:px-4 lg:py-3 bg-linear-to-r text-sm from-purple-600 mb-2 to-pink-600 w-full text-white py-2 px-3 flex items-center gap-x-2 justify-center cursor-pointer transition-all duration-300 hover:opacity-80"
      >
        <Icon name="mdi:eye-outline" size="24px" />
        مشاهده جزییات
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
  },
});
const { formatDate } = useDateChanger();
</script>
