import { createMask } from '@ngneat/input-mask';

export const sekMask = createMask({
  alias: 'currency',
  groupSeparator: ' ',
  digits: 2,
  radixPoint: ',',
  suffix: ' SEK',
  digitsOptional: true,
  parser: (value: string) =>
    parseFloat(value.replace(/SEK| /g, '').split(',').join('.')),
});
