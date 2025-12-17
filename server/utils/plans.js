export const plans = {
  Free: {
    promptsLimit: 10,
    imagesLimit: 3,
    durationDays: 30,
    price: 0,
  },
  Pro: {
    promptsLimit: 70,
    imagesLimit: 30,
    durationDays: 30,
    price: 49900,
  },
  Enterprise: {
    promptsLimit: 999999,
    imagesLimit: 9999,
    durationDays: 30,
    price: 149000,
  },
};
export function getPlanConfig(planName) {
  return plans[planName] || null;
}
