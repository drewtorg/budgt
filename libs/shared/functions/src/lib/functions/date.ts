export function parseDateParts(date: Date) {
  const dateSections =
    date
      .toISOString()
      .split('T')[0]
      .split('-')
      .map((s) => parseInt(s)) ?? [];
  return {
    year: dateSections[0],
    month: dateSections[1],
    day: dateSections[2],
  };
}
