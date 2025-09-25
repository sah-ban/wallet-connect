"use client";
import { useAccount, useDisconnect, useConnect } from "wagmi";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connectors, connect, isPending } = useConnect();

  const wc = connectors.find((c) => c.id === "walletConnect");

  return (
    <div>
      {!isConnected ? (
        <button
          onClick={() => (wc ? connect({ connector: wc }) : undefined)}
          disabled={!wc || isPending}
        >
          {isPending ? "Connecting..." : "Connect Wallet"}
        </button>
      ) : (
        <div>
          <div>Connected: {address}</div>
          <button onClick={() => disconnect()}>Disconnect</button>
        </div>
      )}
    </div>
  );
}
