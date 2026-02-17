import { getEthInUsd, getWalletHistoryByPeriod } from '../app/actions/wallet';
import ChartClient from './ChartClient';

export default async function ChartServer() {
  const [priceData, h1, h6, h1d, h1w, h1m, hAll] = await Promise.all([
    getEthInUsd(),
    getWalletHistoryByPeriod(3600),
    getWalletHistoryByPeriod(21600),
    getWalletHistoryByPeriod(86400),
    getWalletHistoryByPeriod(604800),
    getWalletHistoryByPeriod(2592000),
    getWalletHistoryByPeriod(9999999999),
  ]);

  const allHistory = {
    '1H': h1,
    '6H': h6,
    '1D': h1d,
    '1W': h1w,
    '1M': h1m,
    'All': hAll,
  };

  return <ChartClient initialPriceData={priceData} allHistory={allHistory} />;
}