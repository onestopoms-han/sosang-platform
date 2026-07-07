export const easeInOutSine = (t: number): number => Math.sin(t * Math.PI / 2);
export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
export const easeInElastic = (t: number): number => {
  const c4 = (2 * Math.PI) / 3;
  return Math.pow(2, -10 * t) * Math.sin((t - 1.75) * c4) + 1;
};