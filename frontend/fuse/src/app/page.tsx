"use client";

import dynamic from "next/dynamic";
import Container from "../components/opencraft/Container";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function HomePage() {
  return (
    <main className="flex min-h-screen h-screen w-screen flex-col items-center justify-center bg-gradient-to-b from-[#41126e] to-[#15162c] text-white pt-[72px]">
      <div className="relative h-full w-full bg-slate-800">
        <DndProvider backend={HTML5Backend}>
          <Container />
        </DndProvider>
      </div>
    </main>
  );
}
