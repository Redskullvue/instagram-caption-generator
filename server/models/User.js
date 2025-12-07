import mongoose from "mongoose";
import { plans } from "~~/server/utils/plans";
import crypto from "crypto";
// In order to track created transactions
const transactionSchema = new mongoose.Schema({
  transId: {
    type: String,
    required: true,
  },
  planName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },
  gateway: {
    type: String,
    default: "bitpay",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// This section is about creating chatHistory for each user
const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  shouldAnimate: {
    type: Boolean,
    default: false,
  },
});

const chatSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "چت جدید",
  },
  messages: [messageSchema],

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// This section is totally about the User and their stuff
const userSchema = new mongoose.Schema({
  // Basic Info
  email: {
    type: String,
    required: [true, "ایمیل اجباری میباشد"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "لطفا ایمیل صحیح وارد کنید"],
  },

  password: {
    type: String,
    required: [true, "پسورد اجباری می باشد"],
    trim: true,
    minlength: 6,
    select: false, // Won't return password in queries by default
  },
  // Reset and Change Password
  resetPasswordToken: {
    type: String,
    select: false,
  },
  resetPasswordExpires: {
    type: Date,
    select: false,
  },

  name: {
    type: String,
    required: [true, "نام و نام خانوادگی اجباری است"],
    trim: true,
    maxlength: [50, "Name cannot exceed 50 characters"],
  },
  // Transaction History
  transactions: [transactionSchema],
  //   Subscription / Plan
  plan: {
    type: String,
    enum: ["Free", "Pro", "Enterprise"],
    default: "Free",
  },
  planExpiresAt: {
    type: Date,
    default: null,
  },
  //   Usage Tracking
  usage: {
    promptsUsed: {
      type: Number,
      default: 0,
    },
    promptsLimit: {
      type: Number,
      default: 5,
    },
    resetDate: {
      type: Date,
      default: () => getNextResetDate(),
    },
  },

  // Chat history embedded in user
  chats: [chatSchema],
  currentChatId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },
  //   Accout Status
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    select: false, // Don't return in queries
  },
  verificationTokenExpires: {
    type: Date,
    select: false, // Don't return in queries
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  lastLoginAt: {
    type: Date,
    default: Date.now,
  },
});

// Helper function for reset date
function getNextResetDate() {
  const now = new Date();
  now.setMonth(now.getMonth() + 1);
  now.setDate(1);
  now.setHours(0, 0, 0, 0);
  return now;
}
// Update timestamp on save
userSchema.pre("save", async function () {
  this.updatedAt = new Date();
});

// User Email Verification Methods
userSchema.methods.generateVerificationToken = async function () {
  const token = await crypto.randomBytes(32).toString("hex");
  this.verificationToken = token;
  this.verificationTokenExpires = Date.now() + 1000 * 60 * 15;

  this.save();

  return token;
};

// Verify the token
userSchema.methods.verifyEmail = function (token) {
  if (this.verificationToken !== token) {
    throw new Error("توکن اشتباه می باشد ایمیل تایید نشد");
  }

  if (this.verificationTokenExpires < new Date()) {
    throw new Error("زمان توکن منقضی شده لطفا لینک جدید دریافت کنید");
  }

  this.isVerified = true;
  this.verificationToken = undefined;
  this.verificationTokenExpires = undefined;

  this.save();
  return true;
};

// Generate Token For Password Reset
userSchema.methods.generateResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Hash Token Before Storing
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Token Expires in 15 mins
  this.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
  this.save();
  return resetToken;
};

// Transform output to match front-end structure
userSchema.methods.toClientJSON = function () {
  return {
    id: this._id,
    email: this.email,
    name: this.name,
    plan: this.plan,
    planExpiresAt: this.planExpiresAt,
    isVerified: this.isVerified,
    createdAt: this.createdAt,
  };
};
// Transform usage output to match front-end structure
userSchema.methods.getUsage = function () {
  return {
    promptsUsed: this.usage.promptsUsed,
    promptsLimit: this.usage.promptsLimit,
    resetDate: this.usage.resetDate,
  };
};

// check and reset usage if needed
userSchema.methods.checkAndResetUsage = function () {
  const now = new Date();
  if (this.usage.resetDate && now >= this.usage.resetDate) {
    this.usage.promptsUsed = 0;
    this.usage.resetDate = getNextResetDate();
    return true; // reset succesfull
  }
  return false; //No reset needed
};

// Increment usage
userSchema.methods.incrementUsage = async function () {
  this.checkAndResetUsage();
  if (this.usage.promptsUsed >= this.usage.promptsLimit) {
    throw new Error("Usage Limit Reached");
  }
  this.usage.promptsUsed += 1;
  await this.save();
  return this.getUsage();
};

// Chat Management Methods
// 1-This will create an empty new Chat
userSchema.methods.createNewChat = function (title = "چت جدید") {
  const newChat = {
    title,
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  this.chats.push(newChat);
  this.currentChatId = this.chats[this.chats.length - 1]._id;

  return {
    id: this.chats[this.chats.length - 1]._id,
    title: newChat.title,
    messages: [],
    createdAt: newChat.createdAt,
  };
};

// Add each message to the said chatId
userSchema.methods.addMessageToChat = function (
  chatId,
  role,
  content,
  shouldAnimate = false
) {
  const chat = this.chats.id(chatId);
  if (!chat) {
    throw new Error("Chat not Found");
  }

  const message = {
    role,
    content,
    timestamp: new Date(),
    shouldAnimate,
  };
  chat.messages.push(message);
  chat.updateAt = new Date();
  if (chat.messages.length === 1 && role === "user") {
    chat.title = content.substring(0, 50) + (content.length > 50 ? "..." : "");
  }
  return {
    message,
  };
};

// get the history of all chats from DB and send
userSchema.methods.getChatHistory = function () {
  return this.chats
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .map((chat) => ({
      id: chat._id,
      title: chat.title,
      messageCount: chat.messages.length,
      lastMessage:
        chat.messages[chat.messages.length - 1]?.content.substring(0, 100) ||
        "",
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
    }));
};

// Getting an specific chat from DB and show in the chat UI
userSchema.methods.getChat = function (chatId) {
  const chat = this.chats.id(chatId);
  if (!chat) {
    return null;
  }
  return {
    id: chat._id,
    title: chat.title,
    messages: chat.messages.map((msg) => ({
      id: msg._id,
      text: msg.content,
      isUser: msg.role === "user",
      timestamp: msg.timestamp,
      shouldAnimate: false,
    })),
    createdAt: chat.createdAt,
    updatedAt: chat.updatedAt,
  };
};

//Removing a chat histroy from chat history
userSchema.methods.deleteChat = function (chatId) {
  const chat = this.chats.id(chatId);
  if (chat) {
    chat.deleteOne();

    // If deleting current chat, clear currentChatId
    if (this.currentChatId?.toString() === chatId.toString()) {
      this.currentChatId = null;
    }
  }
};

// update Plan and adjust limits
userSchema.methods.updatePlan = async function (newPlan, transId, amount) {
  console.log(newPlan);
  if (!plans[newPlan]) {
    throw new Error("Invalid Plan");
  }

  const config = plans[newPlan];
  this.plan = newPlan;
  this.usage.promptsLimit = config.promptsLimit || 5;
  this.planExpiresAt =
    newPlan === "Free"
      ? null
      : new Date(Date.now() + config.durationDays * 24 * 60 * 60 * 1000);
  // Add transaction
  this.transactions.push({
    transId: transId,
    planName: newPlan,
    amount: amount,
    status: "success",
    gateway: "bitpay",
    createdAt: new Date(),
  });
  this.usage.promptsUsed = 0;
  await this.save();
  return this.toClientJSON();
};

userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email });
};

userSchema.methods.getChatForContext = function (chatId) {
  const chat = this.chats.id(chatId);

  if (!chat) {
    return [];
  }

  // Return last 10 messages for context
  return chat.messages.slice(-8).map((msg) => ({
    text: msg.content,
    isUser: msg.role === "user",
  }));
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
