export interface Workspace {
  id: string;
  budgets: {
    [key in string]: string;
  };
  name: string;
  password: string;
}
