import Link from "next/link";
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { FlowWalletConnectors } from "@dynamic-labs/flow";


export default function HomePage() {
  return (

    <DynamicContextProvider
    settings={{
      environmentId: "18c9b510-e8c3-432e-8f7e-b56388a30201",
      walletConnectors: [EthereumWalletConnectors, FlowWalletConnectors],
    }}
  >
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#41126e] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
    <DynamicWidget />
      </div>
    </main>
  </DynamicContextProvider>
  );
}
