import { getUsdcBalance, getEthInUsd, getWalletHistoryByPeriod } from '@/app/actions/wallet';
import Wallet from './Wallet';

export default async function WalletServer() {
  const [usdcRes, ethRes, historyDay] = await Promise.all([
    getUsdcBalance(),
    getEthInUsd(),
    getWalletHistoryByPeriod(86400)
  ]);

  return (
    <Wallet
      initialUsdcData={usdcRes}
      initialEthData={ethRes}
      initialHistory={historyDay}
    />
  );
}