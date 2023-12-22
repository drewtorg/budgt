import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthYear',
  standalone: true,
  pure: true,
})
export class MonthYearPipe implements PipeTransform {
  transform(value: { month: number; year: number } | Date): string {
    const date =
      value instanceof Date ? value : new Date(value.year, value.month - 1);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
    }).format(date);
  }
}
