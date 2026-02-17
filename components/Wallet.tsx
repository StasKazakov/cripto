'use client'
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { GoTriangleUp } from "react-icons/go";
import NumberFlow from '@number-flow/react'
import { getUsdcBalance, getEthInUsd } from '@/app/actions/wallet'

interface WalletProps {
  onOpenDeposit: () => void;
  onOpenWithdraw: () => void;
}

const Wallet = ({ onOpenDeposit, onOpenWithdraw }: WalletProps) => {
  const [walletName, setWalletName] = useState("My Wallet")
  const [isEditing, setIsEditing] = useState(false)
  const [usdcBalance, setUsdcBalance] = useState<number>(0)
  const [ethUsdBalance, setEthUsdBalance] = useState<number>(0)
  const inputRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
    }
  }, [isEditing])

  useEffect(() => {
  async function fetchAllBalances() {
    const [usdcRes, ethRes] = await Promise.all([
      getUsdcBalance(),
      getEthInUsd() 
    ])

    if (usdcRes && 'balance' in usdcRes) {
      setUsdcBalance(parseFloat(usdcRes.balance))
    }

    if (ethRes && 'usdValue' in ethRes) {
      setEthUsdBalance(parseFloat(ethRes.usdValue))
    }
  }
  
  fetchAllBalances()
}, [])

  const handleBlur = () => {
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false)
    }
  }

  return (
    <div className="h-full p-5 bg-white rounded-lg border border-gray-500">
        <div className="flex items-center gap-2 mb-6">
            <div className="flex justify-center items-center 
            w-12 h-12 rounded-full bg-orange-500">
                <Image src="/img/pencil.svg" alt="pencil" width={16} height={16} />
            </div>
                <div>
                    <div className="flex font-euclid w-30">
                        {isEditing ? (
                    <input
                        ref={inputRef}
                        value={walletName}
                        maxLength={16}
                        onChange={(e) => setWalletName(e.target.value)}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                        className="w-full font-medium text-xl pr-1 border-b border-gray-400 outline-none"
                    />
                    ) : (
                    <>
                        <div className="font-medium text-xl pr-1">
                        {walletName}
                        </div>
                        <Image
                        src="/img/edit.svg"
                        alt="edit"
                        width={14}
                        height={14}
                        className="cursor-pointer"
                        onClick={() => setIsEditing(true)}
                        />
                    </>
                    )}
                </div>
                </div>

                <div className="flex justify-end ml-auto">
                    <div className="flex flex-col justify-center px-2">
                        <p className="font-regular text-md text-gray-500 text-center">Portfolio ( Not USDC )</p>
                        <div className="font-medium text-xl mx-auto flex items-center">
                            <span>$</span>
                            <NumberFlow 
                            value={ethUsdBalance} 
                            format={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }} 
                            />
                        </div>
                        </div>

                    <div className="w-px bg-gray-400 h-8"></div>

                    <div className="flex flex-col px-2 justify-center">
                        <p className="font-regular text-md text-gray-500 text-center">USDC + Portfolio</p>
                        <div className="flex justify-center">
                            <Image src="/img/money.svg" alt="arrow" width={20} height={16} />
                            <div className="pl-2 font-medium text-xl flex items-center">
                            <span>$</span>
                            <NumberFlow 
                                value={ethUsdBalance + usdcBalance} 
                                format={{ 
                                minimumFractionDigits: 2, 
                                maximumFractionDigits: 2 
                                }} 
                            />
                            </div>
                        </div>
                    </div>
                </div>
        </div>

        <div>
            <div className="mb-6">
                <div className="text-5xl flex items-baseline gap-2">
                    <NumberFlow 
                        value={usdcBalance} 
                        format={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }} 
                    />
                    <span>USDC</span>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-lg font-medium text-[#3CAB68]">+$23.43</p>
                    <div className="flex items-center">
                        <GoTriangleUp className="text-[#3CAB68]" />
                        <p className="text-lg font-medium text-[#3CAB68]">5.2%</p>
                    </div>
                    <p className="text-lg font-medium text-gray-500">Today</p>
                </div>
            </div>
        </div>
        <div className="flex gap-3">
            <button className="flex flex-1 bg-[#FF5100] text-white py-2 text-lg rounded-lg items-center justify-center 
            cursor-pointer hover:bg-black click"
            onClick={onOpenDeposit}>
                
                <Image src="/img/down.svg" alt="up" width={20} height={20}/>
                <p className="pl-2">Deposit</p>
            </button>
            <button className="flex flex-1 bg-[#E1E1E1] text-black py-2 text-lg rounded-lg border border-gray-400 justify-center 
            cursor-pointer hover:bg-gray-500 click"
            onClick={onOpenWithdraw}>

                <Image src="/img/up.svg" alt="down" width={20} height={20}/>
                <p className="pl-2">Withdraw</p></button>
        </div>

    </div>
  )
}

export default Wallet