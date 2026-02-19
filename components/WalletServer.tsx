import { getUsdcBalance, getEthInUsd, getAllWalletHistory } from '@/app/actions/wallet';
import Wallet from './Wallet';
import { connection } from 'next/server';

export default async function WalletServer() {
  await connection();
  const [usdcRes, ethRes, allHistory] = await Promise.all([
    getUsdcBalance(),
    getEthInUsd(),
    getAllWalletHistory()
  ]);

  const now = Math.floor(Date.now() / 1000);
  const historyDay = allHistory.filter(tx => parseInt(tx.timeStamp) >= now - 86400);

  return (
    <Wallet
      initialUsdcData={usdcRes}
      initialEthData={ethRes}
      initialHistory={historyDay}
    />
  );
}