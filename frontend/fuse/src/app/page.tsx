import SignMessageButton from '@/components/challenges/signWallet';
import MintNFT  from '@/components/challenges/transactWallet';
import dynamic from 'next/dynamic';
import { WagmiProvider } from 'wagmi';
import {config} from "../config";

// Import DraggableCanvas dynamically to disable SSR

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#41126e] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="mb-4 text-4xl font-bold">Infinite Craft Clone</h1>
        <div className="relative h-[600px] w-[800px] bg-gray-300">
          <DndProvider backend={HTML5Backend}>
            <Container />
          </DndProvider>
        </div>
        <SignMessageButton message="CHINGA TU MADRE"/>

        <MintNFT/>

      </div>
    </main>
  );
}
