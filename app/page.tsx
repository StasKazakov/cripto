import ChartServer from "@/components/ChartServer";
import Wallet from "@/components/Wallet";

export default function Home() {
  return (
    <main className="h-screen w-full flex items-center justify-center p-2 md:p-6 overflow-hidden mx-auto">
      <div className="flex w-full gap-4 items-stretch">
        <div className="flex-1">
          <Wallet />
        </div>
        <div className="flex-1">
          <ChartServer />
        </div>
      </div>
    </main>
  );
}