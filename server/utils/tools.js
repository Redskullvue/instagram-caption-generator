import OpenAI from "openai";
import { uploadImage } from "./uploadGeneratedImage";

const config = useRuntimeConfig();
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
  {
    type: "function",
    function: {
      name: "generateImage",
      description:
        "Generate an AI image based on a text description. Always translate Persian/Farsi prompts to English before calling this function. Use this when users ask to create, generate, or make an image.",
      parameters: {
        type: "object",
        properties: {
          prompt: {
            type: "string",
            description:
              "The English description of the image to generate. If user prompt is in Persian, translate it to English first.Do not translate names or anything that user wants to be on the image.",
          },
        },
        required: ["prompt"],
      },
    },
  },
];
// Pick selected Tools
export function toolPicker(name) {
  return tools.filter((tool) => tool.function.name === name);
}

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
      },
    );

    const recentPosts = await $fetch(
      "https://instagram120.p.rapidapi.com/api/instagram/reels",
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": config.rapidApiHost,
          "X-RapidAPI-Key": config.rapidApiKey,
        },
        body: {
          username: username,
        },
      },
    );

    // ✅ FIXED: Added proper error handling for missing data
    return {
      followers:
        response.result.edge_followed_by?.count ||
        response.result.edge_followed_by ||
        0,
      bio: response.result.biography || "",
      recentReels: recentPosts.result.edges.slice(0, 10) || [],
    };
  } catch (error) {
    console.error("Instagram API Error:", error.message);
    return {
      error: true,
      message: "مشکلی در بررسی داده های اینستاگرام پیش آمده",
      followers: 0,
      bio: "",
      recentReels: [],
    };
  }
}

export async function generateImage(prompt) {
  const openai = new OpenAI({
    baseURL: config.geminiBaseUrl,
    apiKey: config.nanoBananaKey,
  });
  try {
    const img = await openai.images.generate({
      model: "google/gemini-2.5-flash-image",
      prompt: prompt,
      n: 1,
      size: "1:1",
      quality: "1K",
    });
    const imgBuffer = Buffer.from(img.data[0].b64_json, "base64");
    const imageLink = await uploadImage(imgBuffer);

    return {
      success: true,
      imageUrl: imageLink,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: error.message,
    });
  }
}
