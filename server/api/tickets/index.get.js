import Ticket from "~~/server/models/Tickets";
import User from "~~/server/models/User";
import { requireAuth } from "~~/server/utils/auth";

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
    if (user.role === "user") {
      const tickets = await Ticket.find({ createdBy: userId }).sort({
        createdAt: -1,
      });
      return {
        success: true,
        tickets: tickets,
      };
    } else if (user.role === "admin") {
      const tickets = await Ticket.find().sort({ createdAt: -1 });
      return {
        success: true,
        tickets: tickets,
      };
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "خطا در برقراری ارتباط با سرور",
    });
  }
});
