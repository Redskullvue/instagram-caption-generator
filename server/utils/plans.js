export const plans = {
  Free: {
    promptsLimit: 10,
    imagesLimit: 1,
    durationDays: 30,
    price: 0,
  },
  Pro: {
    promptsLimit: 70,
    imagesLimit: 10,
    durationDays: 30,
    price: 199900,
  },
  Enterprise: {
    promptsLimit: 999999,
    imagesLimit: 40,
    durationDays: 30,
    price: 449000,
  },
};
export function getPlanConfig(planName) {
  return plans[planName] || null;
}
