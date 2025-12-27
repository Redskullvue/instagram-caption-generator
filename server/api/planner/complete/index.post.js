import { requireAuth } from "~~/server/utils/auth";
import User from "~~/server/models/User";

export default defineEventHandler(async (event) => {
  const { scheduleId, planId, completed } = await readBody(event);
  if (!scheduleId || !planId) {
    throw createError({
      statusCode: 400,
      message: "Invalid Request",
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
    const updatedSchedule = user.updateScheduleCompletion(
      planId,
      scheduleId,
      completed
    );
    await user.save();
    return { success: true, schedule: updatedSchedule };
  } catch (error) {
    console.error("Internal Server Error : ", error);

    if (
      error.message === "Content plan not found" ||
      error.message === "Schedule item not found"
    ) {
      throw createError({
        statusCode: 404,
        message: error.message,
      });
    }
    throw createError({
      statusCode: 500,
      message: "خطای داخلی سرور",
    });
  }
});
