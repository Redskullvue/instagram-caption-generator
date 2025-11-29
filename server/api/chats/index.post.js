import { requireAuth } from "~~/server/utils/auth";
import User from "~~/server/models/User";
// Creating new chat In DB
export default defineEventHandler(async (event) => {
  const userId = await requireAuth(event);
  const user = await User.findById(userId);
  if (!user) {
    throw createError({
      statusCode: 404,
      message: "User Not Found",
    });
  }

  const { title } = await readBody(event);
  const newChat = user.createNewChat(title);
  await user.save();
  return {
    success: true,
    chat: newChat,
  };
});
