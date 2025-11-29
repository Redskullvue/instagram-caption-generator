import { requireAuth } from "~~/server/utils/auth";
import User from "~~/server/models/User";
// Get a single chat from chatHistory in DB
export default defineEventHandler(async (event) => {
  const userId = await requireAuth(event);
  const chatId = getRouterParam(event, "id");
  const user = await User.findById(userId);
  if (!user) {
    throw createError({ statusCode: 404, message: "User not found" });
  }
  const chat = user.getChat(chatId);
  if (!chat) {
    throw createError({ statusCode: 404, message: "Chat Not Found" });
  }

  return chat;
});
