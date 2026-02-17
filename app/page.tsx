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
    <main className="flex h-screen w-full items-center justify-center overflow-hidden">
      <div className="flex w-[96%] gap-3">
        <Wallet 
          onOpenDeposit={() => setIsDepositOpen(true)} 
          onOpenWithdraw={() => setIsWithdrawOpen(true)} 
        />
        <Chart />
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
