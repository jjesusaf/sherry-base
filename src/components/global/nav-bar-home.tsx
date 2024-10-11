import React from "react";
import TeamSwitcher from "./team-switcher";
import { Avatar, AvatarFallback, AvatarImage } from "src/components/ui/avatar";
import { Menu } from "lucide-react";
import Image from "next/image";
const NavBarHome: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 flex w-full justify-between items-center py-[0.5rem] z-10 px-[1rem] border border-border rounded-t-lg shadow-md bg-background">
      <Menu className="w-6 h-6 text-foreground" />
      <Image src="/images/icon.svg" alt="logo" width={24} height={24} />
      <Avatar className="w-[40px] h-[40px] rounded-full border border-border items-center justify-center">
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
          className="w-[24px] h-[24px] rounded-full"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default NavBarHome;
