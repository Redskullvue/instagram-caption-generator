import { requireAuth } from "~~/server/utils/auth";
import User from "~~/server/models/User";

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

    // Generate A Token For Email Verification : Lasts 15 Mins
    let mailToken = await user.generateVerificationToken();
    // Send Verification Email
    await sendMail(user.email, user.name, mailToken, user._id);
    return { success: true };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});
