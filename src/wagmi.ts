'use client';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { useMemo } from 'react';
import { http, createConfig } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { NEXT_PUBLIC_WC_PROJECT_ID } from './config';
import { coinbaseWallet } from 'wagmi/connectors';

export function useWagmiConfig() {
  const projectId = NEXT_PUBLIC_WC_PROJECT_ID ?? '';
  if (!projectId) {
    const providerErrMessage =
      'To connect to all Wallets you need to provide a NEXT_PUBLIC_WC_PROJECT_ID env variable';
    throw new Error(providerErrMessage);
  }

  return useMemo(() => {
    const connectors = [coinbaseWallet({ appName: 'Sherry', preference: 'smartWalletOnly' })]

    const wagmiConfig = createConfig({
      chains: [baseSepolia],
      // turn off injected provider discovery
      multiInjectedProviderDiscovery: false,
      connectors,
      ssr: true,
      transports: {
        [baseSepolia.id]: http(),
      },
    });

    return wagmiConfig;
  }, [projectId]);
}
