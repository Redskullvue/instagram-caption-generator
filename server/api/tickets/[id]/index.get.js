import Ticket from "~~/server/models/Tickets";
import User from "~~/server/models/User";
import { requireAuth } from "~~/server/utils/auth";
export default defineEventHandler(async (event) => {
  const ticketId = getRouterParam(event, "id");
  try {
    const userId = await requireAuth(event);
    const user = await User.findById(userId);
    if (!user) {
      throw createError({
        status: 404,
        message: "کاربر وجود ندارد",
      });
    }
    const ticket = await Ticket.findById(ticketId);
    if (ticket.createdBy.toString() === userId || user.role === "admin") {
      return {
        success: true,
        ticket: ticket,
      };
    } else {
      throw createError({
        statusCode: 403,
        message: "Unauthorized",
      });
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "مشکل در دسترسی به سرور ",
    });
  }
});
