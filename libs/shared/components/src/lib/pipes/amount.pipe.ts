import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amount',
  standalone: true,
  pure: true,
})
export class AmountPipe implements PipeTransform {
  transform(value: number, digits = 0): string {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
      minimumFractionDigits: digits,
      maximumFractionDigits: 2,
    })
      .format(value)
      .replace('kr', 'SEK');
  }
}
