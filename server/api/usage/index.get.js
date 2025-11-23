import User from "~~/server/models/User";
import { requireAuth } from "~~/server/utils/auth";
export default defineEventHandler(async (event) => {
  try {
    const userId = await requireAuth(event);
    const user = await User.findById(userId);
    if (!user) {
      throw createError({
        statusCode: 404,
        message: "User Not Found",
      });
    }
    //   Check and reset if needed
    user.checkAndResetUsage();

    await user.save();

    return user.getUsage();
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    // For unexpected errors, create a proper error response
    throw createError({
      statusCode: 500,
      message: "خطای سرور داخلی",
    });
  }
});
