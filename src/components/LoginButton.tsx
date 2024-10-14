'use client';
import WalletWrapper from './WalletWrapper';

export default function LoginButton() {
  return (
    <WalletWrapper
      className="min-w-[90px] hover:bg-white"
      text="Log in"
      withWalletAggregator={true}
    />
  );
}
