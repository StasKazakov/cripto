import { useState } from "react";

interface ModalDepositProps {
  onClose: () => void;
}

const ModalDeposit = ({ onClose }: ModalDepositProps) => {

    const [copied, setCopied] = useState(false);
const walletAddress = "0x8081492B9C372D5d7d65255e95d77D2eca55E679";

const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch (err) {
    console.error('Failed to copy!', err);
  }
};
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg border border-gray-500 p-8 max-w-md w-full relative">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors cursor-pointer"
        >
          ✕
        </button>
        
        <h2 className="flex justify-center items-center text-2xl font-bold mb-4 text-black">Deposit USDC</h2>
        <div className="flex flex-col justify-center items-center text-center gap-2">
            <p className="text-gray-500">
                To replenish your account, transfer your USDC (Sepolia) to the following address:
            </p>
            <p 
                onClick={handleCopy} 
                className="font-mono bg-gray-100 p-2 rounded cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition-colors"
                >
                {copied ? "Copied!" : "0x8081492B9C372D5d7d65255e95d77D2eca55E679"}
            </p>
        </div>
      </div>
    </div>
  )
}

export default ModalDeposit