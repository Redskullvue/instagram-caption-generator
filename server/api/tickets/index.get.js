import Ticket from "~~/server/models/Tickets";
import User from "~~/server/models/User";
import { requireAuth } from "~~/server/utils/auth";

export default defineEventHandler(async (event) => {
  try {
    const userId = await requireAuth(event);
    const user = User.findById(userId);

    if (!user) {
      throw createError({
        statusCode: 404,
        message: "User Not Found",
      });
    }

    const tickets = await Ticket.find({ createdBy: userId });
    return {
      success: true,
      tickets: tickets,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "خطا در برقراری ارتباط با سرور",
    });
  }
});
