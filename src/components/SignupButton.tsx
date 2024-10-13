'use client';
import WalletWrapper from './WalletWrapper';

export default function SignupButton() {
  return (
    <WalletWrapper
      className="ockConnectWallet_Container min-w-[90px] shrink !bg-blue text-[#030712] hover:bg-slate-300"
      text="Sign up"
    />
  );
}
