export function deepClone(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  const clone = Array.isArray(obj) ? [] : {};
  for (const key in obj) {
    clone[key] = deepClone(obj[key]);
  }
  return clone;
}