import Chart from "@/components/Chart";
import Wallet from "@/components/Wallet";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex w-[82%] gap-3">
        <Wallet />
        <Chart />
      </div>
    </main>
  );
}
