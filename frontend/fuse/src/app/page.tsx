import dynamic from 'next/dynamic';

// Import DraggableCanvas dynamically to disable SSR
const DraggableCanvas = dynamic(() => import('@/components/store/draggableCanvas'), {
  ssr: false,
});

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-[#41126e] to-[#15162c] text-white">
      <div className="flex-grow flex flex-col items-center justify-between w-full">
        <h1 className="text-4xl font-bold mt-5">Infinite Craft Clone</h1>
        <div className="w-full h-[20vh] bg-blue-500 flex items-center justify-center"> {/* Adjust color as needed */}
          <DraggableCanvas />
        </div>
        <div className="relative w-full h-[70vh] bg-red-300">
          <DraggableCanvas />
        </div>
      </div>
    </main>
  );
}
