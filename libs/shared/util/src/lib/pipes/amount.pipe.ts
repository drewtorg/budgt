import { Pipe, PipeTransform } from '@angular/core';
import { Currency } from '@budgt/shared/types';

@Pipe({
  name: 'amount',
  standalone: true,
  pure: true,
})
export class AmountPipe implements PipeTransform {
  transform(value: number | null, currency = Currency.SEK, digits = 0): string {
    if (value === null) {
      return '';
    }

    if (currency === Currency.SEK) {
      return new Intl.NumberFormat('sv-SE', {
        style: 'currency',
        currency: 'SEK',
        minimumFractionDigits: digits,
        maximumFractionDigits: 2,
      })
        .format(value)
        .replace('kr', 'SEK');
    }

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: digits,
      maximumFractionDigits: 2,
    }).format(value);
  }
}
