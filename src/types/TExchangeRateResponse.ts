export type TExchangeRateResponse = {
  table: string;
  currency: string;
  code: string;
  rates: [
    {
      no: string;
      effectiveDate: string; // yyyy-mm-dd
      mid: number;
    },
  ];
};
