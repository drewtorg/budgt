export interface Account {
  id: string;
  company: Company;
  type: AccountType;
  name: string;
  amount: number;
  currency: Currency;
}

export enum AccountType {
  Checking = 'Checking',
  Savings = 'Savings',
  FixedRate = 'Fixed Rate',
  LifeInsurance = 'Life Insurance',
  IRA = 'IRA',
  MutualFund = 'Mutual Fund',
}

export enum Company {
  Ally = 'Ally',
  Swedbank = 'Swedbank',
  SBAB = 'SBAB',
  NorthwesternMutual = 'Northwestern Mutual',
}

export enum Currency {
  SEK = 'SEK',
  USD = 'USD',
}
