import "@/styles/globals.css";
import Navbar from "@/components/ui/Navbar";
import {
  DynamicContextProvider,
} from "@dynamic-labs/sdk-react-core";

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { FlowWalletConnectors } from "@dynamic-labs/flow";


import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { useContext } from "react";

export const metadata: Metadata = {
  title: "Fuse",
  description: "Combine elements and mint",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>


      <body>
        <DynamicContextProvider
          settings={{
            environmentId: "18c9b510-e8c3-432e-8f7e-b56388a30201",
            walletConnectors: [EthereumWalletConnectors, FlowWalletConnectors],
          }}
        >
          <Navbar />
          {children}
        </DynamicContextProvider>
      </body>
    </html>
  );
}
