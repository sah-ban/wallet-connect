"use client";

import React from "react";
import { createConfig, http, WagmiProvider } from "wagmi";
import {
  mainnet,
  sepolia,
  polygon,
  arbitrum,
  optimism,
  base,
} from "wagmi/chains";
import { walletConnect } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "9267be7aabfb58a72af7470f589319e0";

const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, polygon, arbitrum, optimism, base],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
  },
  connectors: [
    walletConnect({
      projectId,
      showQrModal: true,
    }),
  ],
});

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
    </QueryClientProvider>
  );
}
