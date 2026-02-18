'use server'
import { cacheTag, cacheLife } from 'next/cache';
import { ethers } from 'ethers'
import { Transaction } from '@/data';

export async function getUsdcBalance() {
  const rpcUrl = process.env.RPC_URL || "https://ethereum-rpc.publicnode.com";
  const walletAddress = process.env.NEXT_PUBLIC_WALLET_ADDRESS
  const usdcAddress = process.env.USDC_ADDRESS;

  if (!walletAddress || !usdcAddress) {
    console.error("Check your env file!");
    return { balance: "0" };
  }

  const WALLET_ADDRESS = walletAddress.toLowerCase();
  const USDC_ADDRESS = usdcAddress.toLowerCase();
  
  const abi = ["function balanceOf(address account) view returns (uint256)"];

  if (!WALLET_ADDRESS) return { balance: "0", error: "No address" };

  try {
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const contract = new ethers.Contract(USDC_ADDRESS, abi, provider);
    const rawBalance = await contract.balanceOf(WALLET_ADDRESS);
    const formatted = ethers.formatUnits(rawBalance, 6);
    
    return { balance: formatted };
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    console.error("Error getting USDC:", message);
    return { balance: "0" };
  }
}

export async function getEthInUsd() {
  "use cache";
  cacheLife("minutes");
  cacheTag(process.env.NEXT_PUBLIC_WALLET_ADDRESS || 'wallet');
  const apiKey = process.env.ETHERSCAN_API_KEY;
  const walletAddress = process.env.NEXT_PUBLIC_WALLET_ADDRESS;
  const rpcUrl = process.env.RPC_URL || "https://ethereum-rpc.publicnode.com";

  if (!walletAddress || !apiKey) return { balance: "0", usdValue: "0" };

  try {
    
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const rawBalance = await provider.getBalance(walletAddress);
    const ethBalance = ethers.formatEther(rawBalance);


    const priceUrl = `https://api.etherscan.io/v2/api?chainid=1&module=stats&action=ethprice&apikey=${apiKey}`;
    const response = await fetch(priceUrl, { next: { revalidate: 60 } }); // Кэшируем на минуту
    const data = await response.json();

    if (data.status === "1" && data.result.ethusd) {
      const ethPrice = parseFloat(data.result.ethusd);
      const usdValue = parseFloat(ethBalance) * ethPrice;

      return {
        balance: ethBalance,
        usdValue: usdValue.toFixed(2)
      };
    }

    throw new Error("Etherscan price error");
  } catch (e: unknown) {
  const message = e instanceof Error ? e.message : 'Unknown error';
  console.error("Error getting ETH balance or price:", message);
  return { balance: "0", usdValue: "0" };
  }
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getWalletHistoryByPeriod(seconds: number) {
  "use cache";
  cacheLife("minutes");
  cacheTag(`wallet-history-${seconds}-${process.env.NEXT_PUBLIC_WALLET_ADDRESS}`);
  await delay(200);
  const apiKey = process.env.ETHERSCAN_API_KEY;
  const address = process.env.NEXT_PUBLIC_WALLET_ADDRESS;
  const url = `https://api.etherscan.io/v2/api?chainid=1&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "1") {
      const now = Math.floor(Date.now() / 1000); 
      const startTime = now - seconds; 

      return data.result.filter((tx: Transaction) => parseInt(tx.timeStamp) >= startTime);
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching filtered history:", error);
    return [];
  }
}