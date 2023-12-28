export function capitalize(value?: string): string {
  if (!value) return '';

  return value[0].toLocaleUpperCase() + value.slice(1);
}
