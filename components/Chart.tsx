'use client'
import Image from "next/image";
import { GoTriangleUp } from "react-icons/go";
import { useState, useEffect } from "react";
import { getWalletHistoryByPeriod, getEthInUsd } from '../app/actions/wallet';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const secondsMap: Record<string, number> = {
  '1H': 3600,
  '6H': 21600,
  '1D': 86400,   
  '1W': 604800,
  '1M': 2592000,
  'All': 9999999999
};

const Chart = () => {
  const [displayProfit, setDisplayProfit] = useState("0.00");
  const [isPositive, setIsPositive] = useState(true);
  const [chartData, setChartData] = useState<{label: string, balance: number}[]>([]);
  const rangeLabels: Record<string, string> = {
    '1H': 'Hour',
    '6H': '6 Hours',
    '1D': 'Day',
    '1W': 'Week',
    '1M': 'Month',
    'All': 'Total'
  };
  const timeRanges = ['1H', '6H', '1D', '1W', '1M', 'All'];
  const [activeRange, setActiveRange] = useState('1H');
  const MY_ADDRESS = (process.env.NEXT_PUBLIC_WALLET_ADDRESS || "").toLowerCase();
  
  useEffect(() => {
  const loadData = async () => {
    try {
      const seconds = secondsMap[activeRange];
      const history = await getWalletHistoryByPeriod(seconds);
      const priceData = await getEthInUsd(); 
      const rawUsdValue = priceData.usdValue.replace(/[^0-9.]/g, '');
      const balance = parseFloat(priceData.balance);
      const currentPrice = balance > 0 ? parseFloat(rawUsdValue) / balance : 0;

      if (!history || history.length === 0) {
        setDisplayProfit("0.00");
        setIsPositive(true);
        return;
      }

      const sorted = [...history].sort((a: any, b: any) => 
          parseInt(a.timeStamp) - parseInt(b.timeStamp)
        );

        let running = parseFloat(priceData.balance); 
        const points = sorted.map((tx: any) => {
          const val = parseFloat(tx.value) / 1e18;
          running = tx.to.toLowerCase() === MY_ADDRESS ? running - val : running + val;
          return {
            label: new Date(parseInt(tx.timeStamp) * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            balance: parseFloat((running * currentPrice).toFixed(2))
          };
        }).reverse();

        points.push({ label: 'Now', balance: parseFloat((parseFloat(priceData.balance) * currentPrice).toFixed(2)) });
        setChartData(points);

      const diffEth = history.reduce((acc: number, tx: any) => {
        const val = parseFloat(tx.value) / 1e18;
        return tx.to.toLowerCase() === MY_ADDRESS ? acc + val : acc - val;
      }, 0);

      const totalUsd = diffEth * currentPrice;
      setDisplayProfit(Math.abs(totalUsd).toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      }));
      setIsPositive(totalUsd >= 0);
      
    } catch (error) {
      console.error("Calculation error:", error);
      setDisplayProfit("0.00");
    }
  };

  loadData();
}, [activeRange, MY_ADDRESS]); 

  return (
    <div className='h-full p-5 bg-white rounded-lg border border-gray-500'>
      
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-2">
          <GoTriangleUp className="text-[#3CAB68] text-xl" />
          <p className="text-md text-gray-500 font-medium">Profit/Loss</p>
        </div>

        <div className="flex gap-2">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`px-3 py-1 text-sm font-medium rounded-full transition-all 
                ${activeRange === range 
                  ? "bg-[#FFF2EB] text-[#FF5100]" 
                  : "text-gray-400 hover:text-gray-600" 
                }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <p className="text-4xl font-bold">
          {isPositive ? '+' : '-'}${displayProfit}
        </p>
          <p className="text-gray-500 text-lg mt-1">
            {activeRange === 'All' ? 'Total Balance Change' : `Past ${rangeLabels[activeRange]}`}
          </p>
        </div>
        <Image src="/img/logo.svg" alt="logo" width={30} height={20} />
      </div>

      <div className="mt-8 h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} interval="preserveStartEnd" />
            <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} width={55} />
            <Tooltip formatter={(v: any) => [`$${v}`, 'Balance']} />
            <Area type="monotone" dataKey="balance" stroke="#FF5100" strokeWidth={2} fill="#FF5100" fillOpacity={0.1} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Chart;