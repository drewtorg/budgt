export interface Category {
  id: string;
  name: string;
  type: CategoryType;
}

export enum CategoryType {
  Need = 'need',
  Want = 'want',
  Dreams = 'dreams',
}
