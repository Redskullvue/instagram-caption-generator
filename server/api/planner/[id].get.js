import { requireAuth } from "~~/server/utils/auth";
import User from "~~/server/models/User";

export default defineEventHandler(async (event) => {
  const planId = getRouterParam(event, "id");
  try {
    const userId = await requireAuth(event);
    const user = await User.findById(userId);
    if (!user) {
      throw createError({
        statusCode: 404,
        message: "User not Found",
      });
    }
    if (!planId) {
      throw createError({
        statusCode: 400,
        message: "برای دریافت برنامه شناسه پلن نیاز است",
      });
    }

    const plan = await user.getContentPlan(planId);
    return {
      success: true,
      plan: plan,
    };
  } catch (error) {
    console.error("Failed To Fetch Data : ", error.message);
  }
});
