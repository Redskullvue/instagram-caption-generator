import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "~~/server/models/User";

export default defineEventHandler(async (event) => {
  const { email, password, name } = await readBody(event);
  const config = useRuntimeConfig();
  //Check for available data
  if (!email || !password || !name) {
    throw createError({
      statusCode: 400,
      message: "Missing Data",
    });
  }
  // Check for existing user
  const existingUser = await User.findByEmail();
  if (existingUser) {
    throw createError({
      statusCode: 400,
      message: "Email Already Exists",
    });
  }

  if (password.length < 6) {
    throw createError({
      status: 400,
      message: "Password Requires At Least 6 Characters",
    });
  }
  // Hash the entered password
  const hashedPassword = await bcrypt.hash(password, 12);
  // Create User;
  const user = await User.create({
    email: email.toLowerCase(),
    password: hashedPassword,
    name: name,
  });

  //   Generate Token After SignUp;
  const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
    expiresIn: "1d",
  });
  return {
    user: user.toClientJSON(),
    token,
  };
});
