import User from "~~/server/models/User";
import { requireAuth } from "~~/server/utils/auth";

export default defineEventHandler(async (event) => {
  const userId = await requireAuth(event);
  const user = await User.findById(userId);

  if (!user) {
    throw createError({
      statusCode: 404,
      message: "User Not Found",
    });
  }

  try {
    const usage = await user.incrementUsage();
    return usage;
  } catch (error) {
    throw createError({
      statusCode: 403,
      message: "Usage Limit Reached . Please Upgrade your plan.",
    });
  }
});
