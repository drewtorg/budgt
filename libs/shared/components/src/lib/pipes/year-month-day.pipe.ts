import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yearMonthDay',
  standalone: true,
  pure: true,
})
export class YearMonthDayPipe implements PipeTransform {
  transform(value: { day: number; month: number; year: number }): string {
    const date = new Date(value.year, value.month - 1, value.day);
    return new Intl.DateTimeFormat('sv-SE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  }
}
