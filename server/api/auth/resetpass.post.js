import bcrypt from "bcryptjs";
import User from "~~/server/models/User";
import crypto from "crypto";
export default defineEventHandler(async (event) => {
  const { userId, token, newPassword } = await readBody(event);
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    _id: userId,
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: Date.now() },
  }).select("+resetPasswordToken +resetPasswordExpires");
  if (!user) {
    throw createError({
      statusCode: 400,
      message: "توکن منقضی شده یا اشتباه می باشد",
    });
  }

  if (newPassword.length < 6) {
    throw createError({
      statusCode: 422,
      message: "پسورد باید بیشتر از 6 کاراکتر باشد",
    });
  }

  //   Update Password If ok
  user.password = await bcrypt.hash(newPassword, 12);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();
  return { success: true };
});
