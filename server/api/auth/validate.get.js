import { requireAuth } from "~~/server/utils/auth";
import User from "~~/server/models/User";

export default defineEventHandler(async (event) => {
  try {
    const userId = await requireAuth(event);
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw createError({
        statusCode: 404,
        message: "User Not Found",
      });
    }

    return {
      valid: true,
      user: user.toClientJSON(),
    };
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: "زمان حساب شما منقضی شده دوباره وارد شوید",
    });
  }
});
