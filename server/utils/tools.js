// server/utils/tools.js (or utils/tools.js)

export const tools = [
  {
    type: "function",
    function: {
      name: "newsForm",
      description:
        "returns a template for news like captions for journalists as string",
      parameters: {
        type: "object",
        properties: {
          subject: {
            type: "string",
            description:
              "The subject that user wants to write about Options : Could be anything",
          },
        },
        required: ["subject"], // ✅ FIXED: Moved inside parameters object
      },
    },
  },
  {
    type: "function",
    function: {
      name: "getInstagramData",
      description:
        "returns the follower count and bio of the instagram page required",
      parameters: {
        type: "object",
        properties: {
          username: {
            type: "string",
            description:
              "The username that user wants to be checked out and be given data based on that",
          },
        },
        required: ["username"], // ✅ FIXED: Added required field
      },
    },
  },
];

export function newsForm(subject) {
  return `کپشن نوشته شده باید در مورد ${subject} باشه 
    قالب کپشن های خبری در اینستاگرام به صورت سریع و  فوق العاده رسمی هستند
    `;
}

export async function getInstagramData(username) {
  const config = useRuntimeConfig();
  if (!username) {
    throw new Error("یوزر نیم نیاز می باشد");
  }
  try {
    const response = await $fetch(
      "https://instagram120.p.rapidapi.com/api/instagram/profile",
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": config.rapidApiHost,
          "X-RapidAPI-Key": config.rapidApiKey,
        },
        body: {
          username: username,
        },
      }
    );

    // ✅ FIXED: Added proper error handling for missing data
    return {
      followers:
        response.result.edge_followed_by?.count ||
        response.result.edge_followed_by ||
        0,
      bio: response.result.biography || "",
    };
  } catch (error) {
    console.error("Instagram API Error:", error.message);
    return {
      error: true,
      message: "مشکلی در بررسی داده های اینستاگرام پیش آمده",
      followers: 0,
      bio: "",
    };
  }
}
