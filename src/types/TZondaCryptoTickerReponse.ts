export type TZondaCryptoTickerReponse =
  | {
      status: 'Ok';
      ticker: {
        market: {
          code: string;
          first: {
            currency: string;
            minOffer: string;
            scale: number;
          };
          second: {
            currency: string;
            minOffer: string;
            scale: number;
          };
          amountPrecision: number;
          pricePrecision: number;
          ratePrecision: number;
        };
        time: string;
        highestBid: string;
        lowestAsk: string;
        rate: string;
        previousRate: string;
      };
    }
  | {
      status: 'Fail';
      errors: string[];
    };
