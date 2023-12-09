import { createMask } from '@ngneat/input-mask';

export const amountMask = createMask({
  alias: 'numeric',
  groupSeparator: ' ',
  digits: 2,
  digitsOptional: true,
  radixPoint: ',',
  suffix: ' SEK',
  parser: (value: string) => parseFloat(value.match(/\d+/g)?.join('.') ?? ''),
});
