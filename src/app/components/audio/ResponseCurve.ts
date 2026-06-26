export function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

export function easeInOut(value: number) {
  return value * value * (3 - 2 * value);
}

export function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}