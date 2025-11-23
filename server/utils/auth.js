import jwt from "jsonwebtoken";

export async function requireAuth(event) {
  const config = useRuntimeConfig();
  const authHeader = getHeader(event, "authorization");

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
      message: "Invalid Or Expired Token",
    });
  }
}
