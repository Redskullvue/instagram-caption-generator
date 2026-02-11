import { requireAuth } from "~~/server/utils/auth";
import User from "~~/server/models/User";
import { checkPlanExpiry } from "~~/server/utils/checkPlanExpiry";
import { generatePlan } from "~~/server/utils/planGenerator";
export default defineEventHandler(async (event) => {
  const userId = await requireAuth(event);
  const user = await User.findById(userId);

  if (!user) {
    throw createError({
      status: 404,
      message: "User Not Found",
    });
  }
  // Check for the plan on each chat request to server
  checkPlanExpiry(user);
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

  const { prompt, options, chatId, selectedAIEngine } = await readBody(event);

  if (!prompt || prompt.trim().length === 0) {
    throw createError({
      statusCode: 400,
      message: "Prompts Is Required",
    });
  }
  if (prompt.length > 500) {
    throw createError({
      statusCode: 400,
      message: "Prompt too long. Maximum 150 characters.",
    });
  }

  try {
    // Create New Chat if not exist or get currentchat
    let result;
    let currentChatId = chatId;
    if (!currentChatId) {
      const newChat = user.createNewChat();
      currentChatId = newChat.id;
    }
    // Get conversation history for context
    const conversationHistory = user.getChatForContext(currentChatId);
    // Add user message to chat
    user.addMessageToChat(currentChatId, "user", prompt, false);
    if (selectedAIEngine !== "gemeni") {
      if (user.plan === "Free") {
        throw createError({
          statusCode: 404,
          message: "متاسفانه شما قابلیت استفاده از این هوش مصنوعی را ندارید",
        });
      }
      result = await generatePlan(
        prompt,
        options,
        conversationHistory,
        selectedAIEngine,
      );
    } else {
      result = await generatePlan(
        prompt,
        options,
        conversationHistory,
        "gemeni",
      );
    }
    // Add AI response to chat
    user.addMessageToChat(currentChatId, "assistant", result.plan, true);

    // Update current chat ID
    user.currentChatId = currentChatId;

    // For Planning We should do 5 increments per usage
    for (let i = 0; i <= 6; i++) {
      await user.incrementUsage();
    }

    const savedPlan = await user.saveContentPlan({
      prompt: prompt,
      textPlan: result.plan,
      jsonPlanData: result.jsonPlanData,
      usage: result.usage,
    });
    return {
      success: true,
      plan: result.plan,
      planId: savedPlan.id,
      usage: user.getUsage(),
      chatId: currentChatId.toString(),
      tokens: result.usage,
    };
  } catch (error) {
    console.error("Plan Generation Error : ", error);
    throw createError({
      statusCode: 500,
      message: "مشکل در بررسی پیج و تولید محتوا",
    });
  }
});
