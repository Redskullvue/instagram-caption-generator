import { requireAuth } from "~~/server/utils/auth";
import User from "~~/server/models/User";

export default defineEventHandler(async (event) => {
  const userId = requireAuth(event);
  const chatId = getRouterParam(event, "id");
  const user = User.findById(userId);
  if (!user) {
    throw createError({ statusCode: 404, message: "User not found" });
  }

  user.deleteChat(chatId);
  await user.save();
  return {
    success: true,
  };
});
