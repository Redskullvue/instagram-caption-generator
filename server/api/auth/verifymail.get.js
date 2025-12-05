import User from "~~/server/models/User";
export default defineEventHandler(async (event) => {
  const { userId, token } = getQuery(event);
  try {
    const user = await User.findById(userId).select(
      "+verificationToken +verificationTokenExpires"
    );
    if (!user) {
      return sendRedirect(event, "/signup");
    }
    const isValid = user.verifyEmail(token);
    if (isValid) {
      return sendRedirect(event, "/chat");
    } else {
      return sendRedirect(event, "/signup");
    }
  } catch (error) {
    return sendRedirect(event, "/signup");
  }
});
