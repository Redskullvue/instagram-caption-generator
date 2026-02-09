<template>
  <div class="w-full flex items-center justify-center flex-col gap-y-10">
    <!-- Guide -->
    <div
      class="w-full xl:w-[80%] bg-blue-100 rounded-xl border border-blue-500 border-dashed p-4 text-blue-500"
    >
      <div class="flex items-center gap-x-3">
        <Icon
          name="material-symbols:info-outline"
          size="24px"
          class="text-blue-600"
        />
        <p class="text-blue-600">راهنمای ارسال تیکت</p>
      </div>
      <ul class="mt-3 text-sm flex flex-col gap-y-2">
        <li>عنوان تیکت را به صورت واضح و مختصر بنویسید</li>
        <li>زمان پاسخگویی معمولاً کمتر از ۲۴ ساعت است</li>
        <li>انتخاب اولویت مخصوص کاربران ویژه می باشد</li>
        <li>
          توضیحات خود را به کامل ترین شکل ممکن بنویسید تا همکاران ما بتوانند
          راهنمایی های لازم رو انجام دهند
        </li>
      </ul>
    </div>
    <!-- Form -->
    <div class="w-full xl:w-[80%] p-1">
      <NewTicketForm />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
  layout: "ticket",
});
useHead({
  title: "تیکت جدید",
});
</script>
