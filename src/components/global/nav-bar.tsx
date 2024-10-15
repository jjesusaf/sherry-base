
"use client"
import React from "react";
import TeamSwitcher from "./team-switcher";
import { Avatar, AvatarFallback, AvatarImage } from "src/components/ui/avatar";
import SignupButton from "src/components/SignupButton";

const NavBar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 flex w-full justify-between items-center py-[0.5rem] z-10 px-[1rem] border border-border rounded-t-lg shadow-md bg-background">
      <TeamSwitcher />
      <SignupButton />
    </div>
  );
};

export default NavBar;
