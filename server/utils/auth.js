import jwt from "jsonwebtoken";
// We created this authenticator as util so we can explicit call it in routes
export async function requireAuth(event) {
  const config = useRuntimeConfig();
  const authHeader = getHeader(event, "Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw createError({
      statusCode: 401,
      message: "No Token provided",
    });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    return decoded.userId;
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: " توکن منقضی شده محددا وارد حساب کاربری خود شوید",
    });
  }
}
