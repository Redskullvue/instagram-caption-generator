import { requireAuth } from "~~/server/utils/auth";
import { generateCaption } from "~~/server/utils/gemeni";
import User from "~~/server/models/User";
import { checkPlanExpiry } from "~~/server/utils/checkPlanExpiry";
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

  const { prompt, options, chatId } = await readBody(event);

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
    // Create New Chat if not exist or get currentchat
    let currentChatId = chatId;
    if (!currentChatId) {
      const newChat = user.createNewChat();
      currentChatId = newChat.id;
    }
    // Get conversation history for context
    const conversationHistory = user.getChatForContext(currentChatId);
    // Add user message to chat
    user.addMessageToChat(currentChatId, "user", prompt, false);

    const result = await generateCaption(prompt, options, conversationHistory);
    // Add AI response to chat
    user.addMessageToChat(currentChatId, "assistant", result.caption, true);
    // Update current chat ID
    user.currentChatId = currentChatId;

    await user.incrementUsage();
    return {
      success: true,
      caption: result.caption,
      usage: user.getUsage(),
      chatId: currentChatId.toString(),
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
