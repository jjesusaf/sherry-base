import type { Metadata } from "next";
import { NEXT_PUBLIC_URL } from "../config";
import "./global.css";
import "@coinbase/onchainkit/styles.css";
import "@rainbow-me/rainbowkit/styles.css";
import dynamic from "next/dynamic";
import ClientLayoutWithSpinner from "../components/ClientLayoutWithSpinner";
import { Toaster } from "../components/ui/toaster";
import { AppProvider } from "../context/GlobalContext";
import NextTopLoader from "nextjs-toploader";

const OnchainProviders = dynamic(
  () => import("src/components/OnchainProviders"),
  {
    ssr: false,
  }
);

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export const metadata: Metadata = {
  title: "Sherry",
  description: "Built by Sherry",
  openGraph: {
    title: "Sherry",
    description: "Built by Sherry",
    images: [`${NEXT_PUBLIC_URL}/vibes/vibes-19.png`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <OnchainProviders>
          <AppProvider>
            <ClientLayoutWithSpinner>
              <NextTopLoader
                color="#CB1D63"
                initialPosition={0.08}
                crawlSpeed={200}
                height={3}
                crawl={true}
                showSpinner={true}
                easing="ease"
                speed={200}
                shadow="0 0 10px #e11d48,0 0 5px #CB1D63"
              />
              {children}
            </ClientLayoutWithSpinner>
            <Toaster />
          </AppProvider>
        </OnchainProviders>
      </body>
    </html>
  );
}
