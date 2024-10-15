"use client";
import React from "react";
import { Menu } from "lucide-react";
import Image from "next/image";
import SignupButton from "../SignupButton";
import { StarIcon, Wallet2Icon } from "lucide-react";
import { useAccount } from "wagmi";

const NavBarHome: React.FC = () => {
  const { address } = useAccount();
  return (
    <div className="fixed top-0 left-0 flex w-full justify-between items-center py-[0.5rem] z-10 px-[1rem] border border-border rounded-t-lg shadow-md bg-background ">
      <Menu className="w-6 h-6 text-foreground" />

      <Image
        src="/icons/icon-192x192.svg"
        alt="logo"
        width={24}
        height={24}
        className="size-10 rounded-full "
      />
      <SignupButton />
    </div>
  );
};

export default NavBarHome;
