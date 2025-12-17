// server/api/generate-image.post.js
import { requireAuth } from "~~/server/utils/auth";
import User from "~~/server/models/User";
import { checkPlanExpiry } from "~~/server/utils/checkPlanExpiry";
import { imagesGenerator } from "~~/server/utils/imageGenerator";

export default defineEventHandler(async (event) => {
  const userId = await requireAuth(event);
  const user = await User.findById(userId);

  if (!user) {
    throw createError({
      statusCode: 404,
      message: "کاربر یافت نشد",
    });
  }

  // Check plan expiry and reset usage if needed
  checkPlanExpiry(user);
  user.checkAndResetUsage();

  // Check image generation limit BEFORE processing
  if (user.usage.imagesGenerated >= user.usage.imagesLimit) {
    throw createError({
      statusCode: 403,
      message:
        "شما تمام درخواست‌های تولید عکس را استفاده کردید. لطفا پلن خود را آپگرید کنید.",
      data: {
        code: "LIMIT_REACHED",
        usage: user.getUsage(),
      },
    });
  }

  const { prompt, chatId } = await readBody(event);

  // Validate prompt
  if (!prompt || prompt.trim().length === 0) {
    throw createError({
      statusCode: 400,
      message: "پرامپت الزامی است",
    });
  }

  if (prompt.length > 500) {
    throw createError({
      statusCode: 400,
      message: "پرامپت خیلی طولانی است. حداکثر 500 کاراکتر.",
    });
  }

  try {
    // Create new chat if doesn't exist
    let currentChatId = chatId;
    if (!currentChatId) {
      const newChat = user.createNewChat("تولید تصویر");
      currentChatId = newChat.id;
    }

    // Get conversation history for context
    const conversationHistory = user.getChatForContext(currentChatId);

    // Add user message to chat
    user.addMessageToChat(currentChatId, "user", prompt, false);

    // Generate image (AWAIT THIS!)
    const result = await imagesGenerator(prompt, conversationHistory);

    if (!result.success || !result.imageUrl) {
      throw new Error(result.error || "تولید تصویر با خطا مواجه شد");
    }

    // Create assistant message with image info
    const assistantMessage = `${result.message}\n\n🖼️ تصویر: ${result.imageUrl}`;

    // Add AI response to chat
    user.addMessageToChat(currentChatId, "assistant", assistantMessage, true);

    // Update current chat ID
    user.currentChatId = currentChatId;

    // Increment usage ONLY after successful generation
    await user.incrementImageUsage();

    // Save all changes
    await user.save();

    return {
      success: true,
      imageUrl: result.imageUrl,
      message: result.message,
      translatedPrompt: result.translatedPrompt, // Useful for debugging
      usage: user.getUsage(),
      chatId: currentChatId.toString(),
    };
  } catch (error) {
    console.error("Image Generation Error:", error);

    // Provide user-friendly error messages
    const errorMessage = error.message || "خطا در تولید تصویر";

    throw createError({
      statusCode: 500,
      message: errorMessage,
    });
  }
});
