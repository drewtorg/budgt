import { createMask } from '@ngneat/input-mask';

export const amountMask = createMask<number>({
  alias: 'currency',
  groupSeparator: ' ',
  digits: 2,
  digitsOptional: true,
  radixPoint: ',',
  suffix: ' SEK',
  parser: (value: string) =>
    parseFloat(value.replace(/SEK| /g, '').split(',').join('.')),
});
