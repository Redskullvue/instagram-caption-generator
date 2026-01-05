import Ticket from "~~/server/models/Tickets";
import User from "~~/server/models/User";
import { requireAuth } from "~~/server/utils/auth";
// This endpoint requires : Message and Role in the body + ticketId in param
export default defineEventHandler(async (event) => {
  // Getting the id of ticket
  const ticketId = getRouterParam(event, "id");
  try {
    const userId = await requireAuth(event);
    const user = await User.findById(userId);
    const body = await readBody(event);
    const ticket = await Ticket.findById(ticketId);
    if (!user) {
      throw createError({
        statusCode: 404,
        message: "User Not Found",
      });
    }

    if (!ticket) {
      throw createError({
        statusCode: 404,
        message: "Ticket Not Found",
      });
    }
    //Check and see if ticket belongs to user nad if the user is not admin
    if (
      ticket.createdBy.toString() !== userId.toString() &&
      user.role !== "admin"
    ) {
      throw createError({ statusCode: 403 });
    }

    ticket.messages.push({
      sender: userId,
      senderType: body.role === "admin" ? "admin" : "user",
      text: body.message,
    });
    ticket.lastMessageAt = new Date();
    ticket.updatedAt = new Date();

    await ticket.save();

    return {
      success: true,
      ticket: ticket,
    };
  } catch (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      message: "خطا در برقراری ارتباط با سرور",
    });
  }
});
