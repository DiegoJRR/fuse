"use client";

import dynamic from "next/dynamic";
import Container from "../components/opencraft/Container";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Import DraggableCanvas dynamically to disable SSR

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#41126e] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 py-16">
        <h1 className="text-4xl font-bold">Fuse Craft!</h1>
        <div className="relative h-[70vh] w-full bg-gray-300">
          <DndProvider backend={HTML5Backend}>
            <Container />
          </DndProvider>
        </div>
      </div>
    </main>
  );
}
