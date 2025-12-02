import User from "~~/server/models/User";

export default defineEventHandler(async (event) => {
  const { trans_id, id_get, userId, plan } = getQuery(event);
  const config = useRuntimeConfig();
  const user = await User.findById(userId);
  if (!user) {
    throw createError({
      statusCode: 404,
      message: "User Not Found",
    });
  }
  try {
    const bitPayResponse = await $fetch(
      "https://bitpay.ir/payment-test/gateway-result-second",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: {
          api: config.gatewayApiKey,
          id_get: id_get,
          trans_id: trans_id,
          json: 1,
        },
      }
    );
    if (bitPayResponse.status === 1) {
      const updatedUser = await user.updatePlan(plan, trans_id, 0);
      return sendRedirect(event, `/chat`);
    } else {
      user.transactions.push({
        transId: trans_id,
        planName: plans[plan],
        amount: 0,
        status: "failed",
        gateway: "bitpay",
        createdAt: new Date(),
      });

      await user.save();
      throw createError({
        statusCode: 400,
        message:
          "متاسفانه مشکلی در پرداخت پیش آمده در صورت عدم بازشگت وجه در 72 ساعت با پشتیبانی تماس حاصل فرمایید" +
          bitPayResponse.status,
      });
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: error,
    });
    // return sendRedirect(event, "/login");
  }
});
