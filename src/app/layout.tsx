import type { Metadata } from "next";
import { NEXT_PUBLIC_URL } from "../config";
import "./global.css";
import "@coinbase/onchainkit/styles.css";
import "@rainbow-me/rainbowkit/styles.css";
import dynamic from "next/dynamic";
import ClientLayoutWithSpinner from "../components/ClientLayoutWithSpinner";
import { Toaster } from "../components/ui/toaster";
import { AppProvider } from "../context/GlobalContext";

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
      <body>
        <OnchainProviders>
          <AppProvider>
            <ClientLayoutWithSpinner>{children}</ClientLayoutWithSpinner>
            <Toaster />
          </AppProvider>
        </OnchainProviders>
      </body>
    </html>
  );
}
