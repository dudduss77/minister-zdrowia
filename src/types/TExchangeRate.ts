export type TExchangeRate = {
  link: string;
  name: string;
  value: number | null;
  currency: 'PLN' | 'USD' | null;
  id?: number;
  label?: string;
};
