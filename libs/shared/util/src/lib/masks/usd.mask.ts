import { createMask } from '@ngneat/input-mask';

export const usdMask = createMask({
  alias: 'numeric',
  groupSeparator: ',',
  digits: 2,
  prefix: '$ ',
  placeholder: '0',
  parser: (value: string) => parseFloat(value.replace(/[$ ,]/g, '')),
});
