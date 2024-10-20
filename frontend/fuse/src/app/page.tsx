"use client"
import SignMessageButton from '@/components/challenges/signWallet';
import MintNFT  from '@/components/challenges/transactWallet';
import dynamic from "next/dynamic";
import Container from "../components/opencraft/Container";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect, useState } from "react";
import { getNewSessionId } from "./getSessionId";

export default function HomePage() {
  useEffect(() => {
    const setSessionCookie = async () => {
      try {
        // Fetch the session ID
        const session_id = await getNewSessionId();

        if (session_id) {
          document.cookie = `sessionId=${session_id}; path=/; max-age=3600`; // Expires in 1 hour
        }
      } catch (error) {
        console.error("Error setting session cookie:", error);
      }
    };

    setSessionCookie();
  }, []); // Empty dependency array ensures this effect runs only once
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
