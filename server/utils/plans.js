export const plans = {
  Free: {
    promptsLimit: 5,
    durationDays: 30,
    price: 0,
  },
  Pro: {
    promptsLimit: 70,
    durationDays: 30,
    price: 49900,
  },
  Enterprise: {
    promptsLimit: 999999,
    durationDays: 30,
    price: 149000,
  },
};
export function getPlanConfig(planName) {
  return plans[planName] || null;
}
