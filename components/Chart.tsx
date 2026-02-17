'use client'
import Image from "next/image";
import { GoTriangleUp } from "react-icons/go";
import { useState, useEffect } from "react";
import { getWalletHistoryByPeriod } from '../app/actions/wallet'

const Chart = () => {
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
  
  useEffect(() => {
    const loadData = async () => {
      const history = await getWalletHistoryByPeriod(3600);
      console.log(history);
    };

    loadData();
  }, []);

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
          <p className="text-4xl font-bold">+$223.43</p>
          <p className="text-gray-500 text-lg mt-1">
            {activeRange === 'All' ? 'Total Balance Change' : `Past ${rangeLabels[activeRange]}`}
          </p>
        </div>
        <Image src="/img/logo.svg" alt="logo" width={30} height={20} />
      </div>

      <div className="mt-8 h-40 w-full bg-gray-50 rounded flex items-center justify-center border-dashed border-2 border-gray-200">
        <p className="text-gray-400 text-sm">Chart will be rendered here</p>
      </div>
    </div>
  )
}

export default Chart;