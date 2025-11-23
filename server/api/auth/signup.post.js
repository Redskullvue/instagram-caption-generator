import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "~~/server/models/User";

export default defineEventHandler(async (event) => {
  const { email, password, name } = await readBody(event);
  const config = useRuntimeConfig();
  try {
    //Check for available data
    if (!email || !password || !name) {
      throw createError({
        statusCode: 400,
        message: "ایمیل ، پسورد و نام کاربری مورد نیاز میباشد",
      });
    }
    // Check for existing user
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw createError({
        statusCode: 409,
        message: "این ایمیل قبلا ثبت شده",
      });
    }

    if (password.length < 6) {
      throw createError({
        statusCode: 422,
        message: "پسورد باید بیشتر از 6 کاراکتر باشد",
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
  } catch (error) {
    if (error.name === "ValidationError") {
      const key = Object.keys(error.errors)[0];
      throw createError({
        statusCode: 400,
        message: error.errors[key].message,
      });
    }
    throw createError({
      statusCode: 500,
      message: error.message,
    });
  }
});
