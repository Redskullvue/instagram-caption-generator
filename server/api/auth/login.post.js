import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "~~/server/models/User";

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);
  const config = useRuntimeConfig();

  try {
    if (!email || !password) {
      throw createError({
        statusCode: 400,
        message: "ایمیل و پسورد را وارد کنید",
      });
    }
    //   find user by password
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );
    if (!user) {
      throw createError({
        statusCode: 404,
        message: "ایمیل یا پسورد اشتباه است",
      });
    }

    //   checkPassword
    const isMatch = await bycrypt.compare(password, user.password);
    if (!isMatch) {
      throw createError({
        statusCode: 401,
        message: "ایمیل یا پسورد اشتباه است ",
      });
    }

    user.lastLoginAt = new Date();
    await user.save();

    //sign jwt token
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: "1d",
    });
    return {
      user: user.toClientJSON(),
      token: token,
    };
  } catch (error) {
    if (error.statusCode) {
      throw error;
    }
    // For unexpected errors, create a proper error response
    throw createError({
      statusCode: 500,
      message: "خطای سرور داخلی",
    });
  }
});
