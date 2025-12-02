import { requireAuth } from "~~/server/utils/auth";
import { getPlanConfig } from "~~/server/utils/plans";
import User from "~~/server/models/User";

export default defineEventHandler(async (event) => {
  const userId = await requireAuth(event);
  const user = await User.findById(userId);
  const config = useRuntimeConfig();
  if (!user) {
    throw createError({
      statusCode: 404,
      message: "User Not Found",
    });
  }
  const { planName } = await readBody(event);
  //Validate Plan
  const planConfig = getPlanConfig(planName);
  if (!planConfig) {
    throw createError({ statusCode: 400, message: "Invalid Plan" });
  }
  if (planConfig.price === 0) {
    throw createError({
      statusCode: 400,
      message: "نمیتوانید پلن رایگان را خریداری کنید",
    });
  }
  // Check if already on this plan
  if (user.plan === planName && user.planExpiresAt > new Date()) {
    throw createError({
      statusCode: 400,
      message: "این پلن در حال حاضر فعال می باشد",
    });
  }

  try {
    const formData = new URLSearchParams();
    formData.append("api", config.gatewayApiKey);
    formData.append("amount", String(planConfig.price * 10));
    formData.append(
      "redirect",
      `http://localhost:3000/api/payments/verify?plan=${planName}&userId=${userId}`
    );
    const bitPayResponse = await $fetch(
      "https://bitpay.ir/payment-test/gateway-send",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      }
    );
    if (bitPayResponse > 0) {
      return {
        code: bitPayResponse,
      };
    } else {
      return {
        error: bitPayResponse,
      };
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: "Error In Creating A Payment Gateway",
    });
  }
});
