import Image from "next/image"
import { GoTriangleUp } from "react-icons/go";
const Wallet = () => {
  return (
    <div className="p-5 bg-white rounded-lg border border-gray-500">
        <div className="flex items-center gap-5 mb-6">
            <div className="flex justify-center items-center 
            w-12 h-12 rounded-full bg-orange-500">
                <Image src="/img/pencil.svg" alt="pencil" width={16} height={16} />
            </div>
                <div>
                    <div className="flex font-euclid">
                        <div className=" font-medium text-xl pr-1">My Wallet</div>
                        <Image src="/img/edit.svg" alt="pencil" width={14} height={14} />
                    </div>
                    <div className="font-medium text-lg text-gray-500">Joined Nov 2025</div>
                </div>

                <div className="flex justify-end ml-auto">
                    <div className="flex flex-col justify-center px-2">
                        <p className="font-regular text-lg text-gray-500">Portfolio ( Not USDC )</p>
                        <p className="font-medium text-xl mx-auto">$3,361.42</p>
                    </div>

                    <div className="border border-gray-400 h-8"></div>

                    <div className="px-2">
                        <p className="font-regular text-lg text-gray-500">USDC + Portfolio</p>
                        <div className="flex justify-center">
                            <Image src="/img/money.svg" alt="arrow" width={20} height={16} />
                            <p className="pl-2 font-medium text-xl">$0,01</p>
                        </div>
                    </div>
                </div>
        </div>

        <div>
            <div className="mb-6">
                <p className="text-5xl">984,42 USDC</p>
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
            <button className="flex bg-[#FF5100] text-white px-28 py-2 text-lg rounded-lg items-center">
                <Image src="/img/down.svg" alt="up" width={20} height={20}/>
                <p className="pl-2">Deposit</p>
            </button>
            <button className="flex bg-[#E1E1E1] text-black px-28 py-2 text-lg rounded-lg border border-gray-400">
                <Image src="/img/up.svg" alt="down" width={20} height={20}/>
                <p className="pl-2">Withdraw</p></button>
        </div>

    </div>
  )
}

export default Wallet