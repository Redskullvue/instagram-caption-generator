import { resetPasswordMail } from "~~/server/utils/resetPasswordMail";
import User from "~~/server/models/User";
export default defineEventHandler(async (event) => {
  try {
    const { email } = await readBody(event);
    const user = await User.findOne({ email }).select(
      "+resetPasswordToken +resetPasswordExpires"
    );

    if (!user) {
      throw createError({
        statusCode: 404,
        message: "کاربری با این ایمیل وجود ندارد",
      });
    }
    const resetToken = user.generateResetPasswordToken();
    await resetPasswordMail(email, resetToken, user._id);
    return { success: true };
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      message: "مشکلی در فرآیند پیش آمده دقایقی دیگر مجددا تلاش کنید",
    });
  }
});
