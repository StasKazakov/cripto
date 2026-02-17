'use client'
import Chart from "@/components/Chart";
import Wallet from "@/components/Wallet";
import ModalDeposit from "@/components/ModalDeposit";
import { useState } from "react";
import ModalWithdraw from "@/components/ModalWithdraw";

export default function Home() {
  
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  return (
    <main className="h-screen w-full flex items-center justify-center p-2 md:p-6 overflow-hidden mx-auto">
      <div className="flex w-full gap-4 items-stretch">
        <div className="flex-1">
        <Wallet 
          onOpenDeposit={() => setIsDepositOpen(true)} 
          onOpenWithdraw={() => setIsWithdrawOpen(true)} 
        />
        </div>
        <div className="flex-1">
          <Chart />
        </div>
        {isDepositOpen && (
          <ModalDeposit onClose={() => setIsDepositOpen(false)} />
        )}
        {isWithdrawOpen && (
          <ModalWithdraw onClose={() => setIsWithdrawOpen(false)} />
        )} 
      </div>
    </main>
  );
}
