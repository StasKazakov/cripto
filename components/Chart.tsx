'use client'

import { useEffect, useState } from 'react'
import NumberFlow from '@number-flow/react'
import { getEthInUsd } from '@/app/actions/wallet' 

const Chart = () => {
  const [balance, setBalance] = useState<number>(0)

  useEffect(() => {
    async function loadData() {
      const result = await getEthInUsd() 
      
      console.log("Клиент получил USDC:", result);

      if (result && 'balance' in result && typeof result.balance === 'string') {
        setBalance(parseFloat(result.usdValue))
      }
    }
    loadData()
  }, [])

  return (
    <div className="p-10 bg-white rounded-lg border border-gray-500 text-black">
      <div className="flex flex-col">
        <span className="text-sm text-gray-500 uppercase font-medium">Total Balance</span>
        <div className="flex items-baseline gap-1">
          <NumberFlow 
            value={balance} 
            format={{ 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            }}
            className="text-3xl font-bold"
          />
          <span className="font-medium text-lg text-blue-600">ETH</span>
        </div>
      </div>
      
      <div className="mt-4 text-[10px] text-gray-400">
        Network: Sepolia Testnet
      </div>
    </div>
  )
}

export default Chart