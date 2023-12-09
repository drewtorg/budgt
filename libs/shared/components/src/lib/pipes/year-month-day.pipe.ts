import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yearMonthDay',
  standalone: true,
  pure: true,
})
export class YearMonthDayPipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);
    return new Intl.DateTimeFormat('sv-SE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).format(date);
  }
}
