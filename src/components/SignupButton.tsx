'use client';
import WalletWrapper from './WalletWrapper';

export default function SignupButton() {
  return (
    <WalletWrapper
      className="flex size-10 font-medium text-black rounded-[.375rem] items-center justify-center text-foreground"
      text="Login"
    />
  );
}
