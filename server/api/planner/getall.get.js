import { requireAuth } from "~~/server/utils/auth";
import User from "~~/server/models/User";

export default defineEventHandler(async (event) => {
  try {
    const userId = await requireAuth(event);
    const user = await User.findById(userId);
    if (!user) {
      throw createError({
        statusCode: 404,
        message: "User not Found",
      });
    }

    const plans = await user.getContentPlans();
    return {
      success: true,
      plans: plans,
      total: plans.length,
    };
  } catch (error) {
    console.error("Failed To Fetch All Plans : ", error);
    throw createError({
      statusCode: 500,
      message: "خطای سرور داخلی",
    });
  }
});
