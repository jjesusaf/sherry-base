'use client';
import WalletWrapper from './WalletWrapper';

export default function SignupButton() {
  return (
    <WalletWrapper
      className=" h-[40px] w-[40px] hover:bg-black rounded-full"
      text="Log In"
    />
  );
}
