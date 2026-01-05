import mongoose from "mongoose";

const ticketMessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  senderType: {
    type: String,
    enum: ["user", "admin"],
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const ticketSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  status: {
    type: String,
    enum: ["open", "pending", "resolved", "closed"],
    default: "pending",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // <-- THIS LINKS TICKET → USER
    required: true,
  },
  messages: [ticketMessageSchema],
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  lastMessageAt: {
    type: Date,
    default: Date.now,
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Ticket = mongoose.models.Ticket || mongoose.model("Ticket", ticketSchema);
export default Ticket;
