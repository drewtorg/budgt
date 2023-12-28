import { CategoryType, Label } from './category';

export interface Totals {
  expected: number;
  actual: number;
  type: CategoryType;
  label: Label;
}
