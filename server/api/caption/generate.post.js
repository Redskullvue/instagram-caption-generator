import { requireAuth } from "~~/server/utils/auth";
import { generateCaption } from "~~/server/utils/gemeni";
import User from "~~/server/models/User";

export default defineEventHandler(async (event) => {
  const userId = await requireAuth(event);
  const user = await User.findById(userId);

  if (!user) {
    throw createError({
      status: 404,
      message: "User Not Found",
    });
  }
  user.checkAndResetUsage();
  if (user.usage.promptsUsed >= user.usage.promptsLimit) {
    throw createError({
      status: 403,
      message: "Usage Limit Reached Please Upgrade Your Plan",
      data: {
        code: "LIMIT_REACHED",
        usage: user.getUsage(),
      },
    });
  }

  const { prompt, options, chatHistory } = await readBody(event);

  if (!prompt || prompt.trim().length === 0) {
    throw createError({
      statusCode: 400,
      message: "Prompts Is Required",
    });
  }
  if (prompt.length > 100) {
    throw createError({
      statusCode: 400,
      message: "Prompt too long. Maximum 100 characters.",
    });
  }

  try {
    const result = await generateCaption(prompt, options, chatHistory || []);
    await user.incrementUsage();
    return {
      success: true,
      caption: result.caption,
      usage: user.getUsage(),
      tokens: result.usage,
    };
  } catch (error) {
    console.error("Caption Generation Error : ", error);
    throw createError({
      statusCode: 500,
      message: "Failed to generate captions",
    });
  }
});
