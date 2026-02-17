import { Suspense } from "react";
import WalletServer from "@/components/WalletServer";
import ChartServer from "@/components/ChartServer";

export default function Home() {
  return (
    <main className="h-screen w-full flex items-center justify-center p-2 md:p-6 overflow-hidden mx-auto">
      <div className="flex w-full gap-4 items-stretch">
        <div className="flex-1">
          <Suspense fallback={<div className="h-full rounded-lg border border-gray-500 animate-pulse bg-gray-50" />}>
            <WalletServer />
          </Suspense>
        </div>
        <div className="flex-1">
          <Suspense fallback={<div className="h-full rounded-lg border border-gray-500 animate-pulse bg-gray-50" />}>
            <ChartServer />
          </Suspense>
        </div>
      </div>
    </main>
  );
}