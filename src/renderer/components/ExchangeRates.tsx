/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import getTicker from '../../api/requests/getTicker';
import ETickerSource from '../../types/ETickerSource';
import { TExchangeRate } from '../../types/TExchangeRate';

function ExchangeRates() {
  const [crypto, setCrypto] = useState('');
  const [loading, setLoading] = useState(false);

  const [binanceER, setBinanceER] = useState<TExchangeRate | null>(null);
  const [bittrexER, setBittrexER] = useState<TExchangeRate | null>(null);
  const [zondaCryptoER, setZondaCryptoER] = useState<TExchangeRate | null>(
    null,
  );

  useEffect(() => {
    setLoading(true);

    (async () => {
      try {
        if (!crypto) return;

        const [
          binanceTickerResponse,
          bittrexTickerResponse,
          zondaTickerResponse,
        ] = await Promise.all([
          getTicker(ETickerSource.BINANCE, crypto),
          getTicker(ETickerSource.BITTREX, crypto),
          getTicker(ETickerSource.ZONDACRYPTO, crypto),
        ]);

        setBinanceER(binanceTickerResponse);
        setBittrexER(bittrexTickerResponse);
        setZondaCryptoER(zondaTickerResponse);
      } finally {
        setLoading(false);
      }
    })();
  }, [crypto]);

  return (
    <div>
      <select onChange={(e) => setCrypto(e.target.value)}>
        <option value="BTC">BTC</option>
        <option value="ETH">ETH</option>
        <option value="LTC">LTC</option>
      </select>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          Binance: <pre>{JSON.stringify(binanceER, null, 2)}</pre>
          Bittrex: <pre>{JSON.stringify(bittrexER, null, 2)}</pre>
          ZondaCrypto: <pre>{JSON.stringify(zondaCryptoER, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ExchangeRates;
