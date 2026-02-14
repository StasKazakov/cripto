import Image from "next/image"
const Wallet = () => {
  return (
    <div className="p-5 bg-white rounded-lg border border-gray-500">
        <div className="flex">
            <div className="flex justify-center items-center 
            w-10 h-10 rounded-full bg-orange-500">
                <Image src="/img/pencil.svg" alt="pencil" width={16} height={16} />
            </div>
                <div>
                    <div className="flex font-euclid">
                        <div className=" font-medium text-xl pr-1">My Wallet</div>
                        <Image src="/img/edit.svg" alt="pencil" width={14} height={14} />
                    </div>
                    <div className="font-medium text-lg text-gray-500">Joined Nov 2025</div>
                </div>
            </div>
        </div>
  )
}

export default Wallet