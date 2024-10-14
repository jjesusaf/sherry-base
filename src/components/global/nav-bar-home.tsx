"use client";
import React from "react";
import TeamSwitcher from "./team-switcher";
import { Menu } from "lucide-react";
import Image from "next/image";
import SignupButton from "../SignupButton";
import { Avatar, Name } from "@coinbase/onchainkit/identity";
import { StarIcon, Wallet2Icon } from "lucide-react";
import { useAccount } from "wagmi";

const NavBarHome: React.FC = () => {
  const { address } = useAccount();
  return (
    <div className="fixed top-0 left-0 flex w-full justify-between items-center py-[0.5rem] z-10 px-[1rem] border border-border rounded-t-lg shadow-md bg-background ">
      <Menu className="w-6 h-6 text-foreground" />

      <Image src="/icons/icon-192x192.png" alt="logo" width={24} height={24} />

      <div className="rounded-full border border-border items-center justify-center flex relative">
        <div className="absolute inset-0 flex items-center justify-center">
          {address ? (
            ""
          ) : (
            <Wallet2Icon className="h-[24px] w-[24px] hover:text-crimson11" />
          )}
        </div>
        <SignupButton />
      </div>
    </div>
  );
};

export default NavBarHome;
