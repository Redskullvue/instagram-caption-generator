import { requireAuth } from "~~/server/utils/auth";
import User from "~~/server/models/User";

export default defineEventHandler(async (event) => {
  const planId = getRouterParam(event, "id");
  if (!planId) {
    throw createError({
      statusCode: 400,
      message: "Invalid Request : PlanId Needed",
    });
  }
  try {
    const userId = await requireAuth(event);
    const user = await User.findById(userId);
    if (!user) {
      throw createError({
        statusCode: 404,
        message: "User Not Found",
      });
    }

    user.deleteContentPlan(planId);
    await user.save();

    return {
      success: true,
    };
  } catch (error) {
    console.error("Internal Server Error : ", error);
    throw createError({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});
