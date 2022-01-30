export function compareCaseInsensitive(a, b) {
  const aT = a.toLowerCase().replace(/[^a-z0-9]/, "");
  const bT = b.toLowerCase().replace(/[^a-z0-9]/, "");
  if (aT < bT) {
    return -1;
  }
  if (aT > bT) {
    return 1;
  }
  return 0;
}
