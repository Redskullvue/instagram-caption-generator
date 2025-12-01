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

  const planName = getQuery(event);
  const updatedUser = await user.updatePlan(planName.plan);
  return {
    success: true,
    user: updatedUser,
  };
});
