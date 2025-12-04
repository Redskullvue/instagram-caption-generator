import User from "~~/server/models/User";
export default defineEventHandler(async (event) => {
  const { userId, token } = getQuery(event);
  try {
    const user = await User.findById(userId).select(
      "+verificationToken +verificationTokenExpires"
    );
    if (!user) {
      return sendRedirect(event, "/login");
    }
    const isValid = user.verifyEmail(token);
    if (isValid) {
      return sendRedirect(event, "/chat");
    } else {
      return sendRedirect(event, "/pricing");
    }
  } catch (error) {
    console.log("Error");
    // return sendRedirect(event, "/signup");
  }
});
