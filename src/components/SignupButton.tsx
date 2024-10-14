'use client';
import WalletWrapper from './WalletWrapper';

export default function SignupButton() {
  return (
    <WalletWrapper
      className="size-10 flex items-center justify-center hover:bg-black rounded-full"
      text="Log In"
    />
  );
}
