import { requireAuth } from "~~/server/utils/auth";
import User from "~~/server/models/User";

export default defineEventHandler(async (event) => {
  const userId = await requireAuth(event);
  const user = await User.findById(userId);

  if (!user) {
    throw createError({
      statusCode: 404,
      message: "User Not Found",
    });
  }

  const history = user.getChatHistory();
  return {
    chats: history,
    currentChatId: user.currentChatId,
  };
});
