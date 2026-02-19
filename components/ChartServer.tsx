import { connection } from 'next/server';
import { getEthInUsd, getAllWalletHistory } from '../app/actions/wallet';
import ChartClient from './ChartClient';
import { Transaction } from '@/data';

export default async function ChartServer() {
  await connection();

  const [priceData, allHistory] = await Promise.all([
    getEthInUsd(),
    getAllWalletHistory()
  ]);

  const now = Math.floor(Date.now() / 1000);
  const filter = (seconds: number): Transaction[] => seconds >= 9999999999
    ? allHistory
    : allHistory.filter(tx => parseInt(tx.timeStamp) >= now - seconds);

  const allHistoryByPeriod = {
    '1H': filter(3600),
    '6H': filter(21600),
    '1D': filter(86400),
    '1W': filter(604800),
    '1M': filter(2592000),
    'All': filter(9999999999),
  };

  return <ChartClient initialPriceData={priceData} allHistory={allHistoryByPeriod} />;
}