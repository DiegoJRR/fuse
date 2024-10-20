import SignMessageButton from '@/components/challenges/signWallet';
import MintNFT  from '@/components/challenges/transactWallet';
import dynamic from 'next/dynamic';
import { WagmiProvider } from 'wagmi';
import {config} from "../config";

// Import DraggableCanvas dynamically to disable SSR
const DraggableCanvas = dynamic(() => import('@/components/store/draggableCanvas'), {
  ssr: false,
});

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#41126e] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">Infinite Craft Clone</h1>
        {/* Render the DraggableCanvas */}
        <div className="relative w-[800px] h-[600px] bg-gray-300">
          <DraggableCanvas />
        </div>
        <SignMessageButton message="CHINGA TU MADRE"/>

        <MintNFT/>

      </div>
    </main>
  );
}
