import { plans } from "~~/server/utils/plans";

export function checkPlanExpiry(user) {
  if (user.plan !== "Free" && user.planExpiresAt) {
    if (new Date() >= new Date(user.planExpiresAt)) {
      // Expired → revert to free
      user.plan = "Free";
      user.usage.promptsLimit = plans.Free.promptsLimit;
      user.planExpiresAt = null;
      return true;
    }
  }
  return false;
}
