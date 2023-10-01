export type TExchangeRate = {
  link: string;
  name: string;
  value: number | null;
  currency: 'PLN' | 'USD' | null;
  isOriginalCurrency?: boolean;
  id?: number;
  label?: string;
};
