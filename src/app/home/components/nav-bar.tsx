import React from "react";
import { Button } from "src/components/ui/button";
import { UserNav } from "./user-nav";
import TeamSwitcher from "./team-switcher";
import { Avatar, AvatarFallback, AvatarImage } from "src/components/ui/avatar";

const NavBar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 flex w-full justify-between items-center py-[0.5rem] px-[1rem] border border-border rounded-t-lg shadow-md bg-background">
      <TeamSwitcher />
      <Avatar className="w-[40px] h-[40px] rounded-full border border-border items-center justify-center">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="w-[24px] h-[24px] rounded-full" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default NavBar;
