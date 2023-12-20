import { Bucket } from './bucket';

export interface Workspace {
  id: string;
  budgets: {
    [key in string]: string;
  };
  buckets: Bucket[];
  name: string;
  password: string;
}
