<template>
  <!-- Blog Container -->
  <div
    class="w-full flex items-center justify-center bg-pink-50 min-h-screen flex-col"
  >
    <h2 class="mt-6 font-bold text-2xl text-center">
      پست های آموزشی و مقالات کپشن ساز
    </h2>
    <!-- Main Container -->
    <div
      class="w-full 2xl:max-w-[80%] grid grid-cols-1 gap-4 lg:grid-cols-3 p-4 mt-10"
    >
      <BlogPostCard v-for="(post, index) in posts" :key="index" :post="post" />
    </div>
  </div>
</template>

<script setup>
const posts = ref([
  {
    title:
      "          آموزش ساخت تصویر با هوش مصنوعی — راهنمای کامل استفاده از ابزار تبدیل متن به عکس",
    description:
      "آموزش کامل ساخت تصویر با هوش مصنوعی + راهنمای استفاده از ابزار تبدیل متن به عکس. یاد بگیرید چطور فقط با نوشتن متن، تصاویر حرفه‌ای تولید کنید.",
    image: "/blog-6.webp",
    link: "/blog/text-to-image-generating",
  },
  {
    title: "تولید محتوا و برندسازی به همراه کپشن نویسی با هوش مصنوعی",
    description:
      "درباره تیم کپشن ساز و ماموریت ما : کمک به تولید کنندگان محتوا برای بهتر دیده شدن در شبکه های مجازی و افزایش سرعت تولید محتوای این افراد",
    image: "/blog-1.png",
    link: "/blog/ai-content-branding",
  },
  {
    title:
      "بررسی رقبا و برنامه ریزی بر اساس فعالیت دیگران با هوش مصنوعی کپشن ساز",
    description:
      "کپشن‌ساز با تحلیل پیج رقیب اینستاگرام، الگوی محتوایی آن‌ها را شناسایی کرده و برای شما برنامه تولید محتوا، کپشن و هشتگ تولید می‌کند. با هوش مصنوعی حرفه‌ای‌تر محتوا بسازید.",
    image: "/blog-1.png",
    link: "/blog/how-to-plan-for-instagram",
  },
  {
    title: "      هوش مصنوعی چگونه مدیریت اینستاگرام را متحول کرده است؟",
    description:
      "با استفاده از هوش مصنوعی، مدیریت اینستاگرام را حرفه‌ای‌تر انجام دهید. برنامه‌ریز محتوا، تولید کپشن، تصویر و سناریو با Captionsaz.",
    image: "/blog-5.png",
    link: "/blog/ai-for-instagram",
  },
]);
useHead({
  title: "بلاگ کپشن ساز | آموزش تولید محتوا با هوش مصنوعی",
  meta: [
    {
      name: "description",
      content:
        "مقالات و آموزش‌های تخصصی تولید محتوا، کپشن‌نویسی و برنامه‌ریزی محتوا با هوش مصنوعی. یاد بگیرید چگونه با کپشن ساز محتوای حرفه‌ای برای اینستاگرام، لینکدین و شبکه‌های اجتماعی بسازید.",
    },
    {
      name: "keywords",
      content:
        "بلاگ کپشن ساز, آموزش تولید محتوا, کپشن نویسی با هوش مصنوعی, برنامه ریزی محتوا اینستاگرام, مقالات تولید محتوا, آموزش اینستاگرام مارکتینگ, کپشن نویسی حرفه ای, هوش مصنوعی تولید محتوا",
    },
    // Open Graph / Facebook
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://captionsaz.ir/blog" },
    {
      property: "og:title",
      content: "بلاگ کپشن ساز | آموزش تولید محتوا با هوش مصنوعی",
    },
    {
      property: "og:description",
      content:
        "مقالات آموزشی تولید محتوا، کپشن‌نویسی و استراتژی‌های شبکه‌های اجتماعی با هوش مصنوعی کپشن ساز",
    },
    { property: "og:image", content: "https://captionsaz.ir/preview-1.png" },
    { property: "og:locale", content: "fa_IR" },
    { property: "og:site_name", content: "کپشن ساز" },
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:url", content: "https://captionsaz.ir/blog" },
    {
      name: "twitter:title",
      content: "بلاگ کپشن ساز | آموزش تولید محتوا با هوش مصنوعی",
    },
    {
      name: "twitter:description",
      content:
        "مقالات آموزشی تولید محتوا، کپشن‌نویسی و استراتژی‌های شبکه‌های اجتماعی",
    },
    { name: "twitter:image", content: "https://captionsaz.ir/preview-1.png" },
    // Additional SEO
    { name: "robots", content: "index, follow" },
    { name: "author", content: "کپشن ساز" },
    { name: "language", content: "Persian" },
    { httpEquiv: "content-language", content: "fa" },
  ],
  link: [
    { rel: "canonical", href: "https://captionsaz.ir/blog" },
    { rel: "alternate", hreflang: "fa", href: "https://captionsaz.ir/blog" },
  ],
  htmlAttrs: {
    lang: "fa",
    dir: "rtl",
  },
  script: [
    // Schema.org structured data for Blog
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "بلاگ کپشن ساز",
        description:
          "مقالات و آموزش‌های تخصصی تولید محتوا و کپشن‌نویسی با هوش مصنوعی",
        url: "https://captionsaz.ir/blog",
        inLanguage: "fa",
        publisher: {
          "@type": "Organization",
          name: "کپشن ساز",
          url: "https://captionsaz.ir",
          logo: {
            "@type": "ImageObject",
            url: "https://captionsaz.ir/logo.png",
          },
        },
        blogPost: posts.value.map((post, index) => ({
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          image: `https://captionsaz.ir${post.image}`,
          url: `https://captionsaz.ir${post.link}`,
          author: {
            "@type": "Organization",
            name: "کپشن ساز",
          },
          publisher: {
            "@type": "Organization",
            name: "کپشن ساز",
            logo: {
              "@type": "ImageObject",
              url: "https://captionsaz.ir/logo.png",
            },
          },
          datePublished: "2026-01-01", // Update with actual dates
          dateModified: "2026-01-01", // Update with actual dates
          inLanguage: "fa",
        })),
      }),
    },
    // BreadcrumbList schema
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "خانه",
            item: "https://captionsaz.ir",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "بلاگ",
            item: "https://captionsaz.ir/blog",
          },
        ],
      }),
    },
  ],
});
</script>
