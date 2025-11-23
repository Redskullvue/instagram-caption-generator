import mongoose from "mongoose";

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
  name: {
    type: String,
    required: [true, "نام و نام خانوادگی اجباری است"],
    trim: true,
    maxlength: [50, "Name cannot exceed 50 characters"],
  },

  //   Subscription / Plan
  plan: {
    type: String,
    enum: ["free", "pro", "enterprise"],
    default: "free",
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
  //   Accout Status
  isVerfied: {
    type: Boolean,
    default: false,
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
// Transform output to match front-end structure
userSchema.methods.toClientJSON = function () {
  return {
    id: this._id,
    email: this.email,
    name: this.name,
    plan: this.plan,
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

// update Plan and adjust limits
userSchema.methods.updatePlan = async function (newPlan) {
  const planLimits = {
    free: 5,
    pro: 100,
    enterprise: Infinity,
  };

  this.plan = newPlan;
  this.usage.promptsLimit = planLimits[newPlan] || 5;
  await this.save();
  return this.toClientJSON();
};

userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email });
};

// Indexes for performance
// userSchema.index({ email: 1 });
// userSchema.index({ createdAt: -1 });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
