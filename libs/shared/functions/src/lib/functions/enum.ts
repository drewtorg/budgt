export function enumToDisplayEnum(e: object) {
  return Object.entries(e).map(([key, value]) => ({
    display: value,
    value: key,
  }));
}
