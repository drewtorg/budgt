import { CategoryType } from './category';

export interface Totals {
  expected: number;
  actual: number;
  type: CategoryType;
  label: string;
}

export interface DisplayEnum {
  value: string;
  display: string;
}
