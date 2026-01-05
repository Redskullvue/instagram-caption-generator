import Ticket from "~~/server/models/Tickets";
import User from "~~/server/models/User";
import { requireAuth } from "~~/server/utils/auth";
export default defineEventHandler(async (event) => {
  const userId = await requireAuth(event);
  const user = await User.findById(userId);
  const body = await readBody(event);
  if (!user) {
    throw createError({
      statusCode: 404,
      message: "User Not Found",
    });
  }

  const ticket = await Ticket.create({
    subject: body.subject,
    priority: body.priority || "low",
    createdBy: userId,
    messages: [
      {
        sender: userId,
        senderType: "user",
        text: body.message,
      },
    ],
  });

  return {
    success: true,
    ticket: ticket,
  };
});
