import { getEthInUsd, getWalletHistoryByPeriod } from '../app/actions/wallet';
import ChartClient from './ChartClient';

export default async function ChartServer() {
  const [priceData, history] = await Promise.all([
    getEthInUsd(),
    getWalletHistoryByPeriod(3600)
  ]);

  return <ChartClient initialPriceData={priceData} initialHistory={history} />;
}