interface ModalWithdrawProps {
  onClose: () => void;
}

const ModalWithdraw = ({ onClose }: ModalWithdrawProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg border border-gray-500 p-8 max-w-md w-full relative text-black">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors cursor-pointer"
        >
          ✕
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-center">Withdraw USDC</h2>
        
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Recipient Address</label>
            <input 
              type="text" 
              placeholder="0x..." 
              className="w-full border border-gray-300 rounded p-2 outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500 mb-1 block">Amount (USDC)</label>
            <input 
              type="number" 
              placeholder="0.00" 
              className="w-full border border-gray-300 rounded p-2 outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <button className="bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-black transition-colors mt-2 cursor-pointer click">
            Confirm Withdraw
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalWithdraw;