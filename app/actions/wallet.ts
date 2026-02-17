'use server'
import { ethers } from 'ethers'

export async function getUsdcBalance() {
  const rpcUrl = process.env.RPC_URL || "https://ethereum-sepolia-rpc.publicnode.com";
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
  } catch (e: any) {
    console.error("Error getting USDC:", e.message);
    return { balance: "0" };
  }
}

export async function getEthInUsd() {
  const rpcUrl = process.env.RPC_URL || "https://ethereum-sepolia-rpc.publicnode.com";
  const walletAddress = process.env.NEXT_PUBLIC_WALLET_ADDRESS;

  if (!walletAddress) return { balance: "0", usdValue: "0" };
  try {
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const rawBalance = await provider.getBalance(walletAddress);
    const ethBalance = ethers.formatEther(rawBalance);
    const priceResponse = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    const priceData = await priceResponse.json();
    const ethPrice = priceData.ethereum.usd;

    const usdValue = parseFloat(ethBalance) * ethPrice;

    return {
      balance: ethBalance,            
      usdValue: usdValue.toFixed(2)
    };
  } catch (e: any) {
    console.error("Error getting ETH balance or price:", e.message);
    return { balance: "0", usdValue: "0" };
  }
}

export async function getWalletHistoryByPeriod(seconds: number) {
  const apiKey = process.env.ETHERSCAN_API_KEY;
  const address = process.env.NEXT_PUBLIC_WALLET_ADDRESS;
  const url = `https://api.etherscan.io/v2/api?chainid=1&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`;

  try {
    const response = await fetch(url, { cache: 'no-store' });
    const data = await response.json();

    if (data.status === "1") {
      const now = Math.floor(Date.now() / 1000); 
      const startTime = now - seconds; 

      return data.result.filter((tx: any) => parseInt(tx.timeStamp) >= startTime);
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching filtered history:", error);
    return [];
  }
}