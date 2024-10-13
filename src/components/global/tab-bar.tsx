"use client";
import React from "react";
import { Home, Trophy, Plus, LayoutDashboard, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TabBar: React.FC = () => {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-around items-center  py-[1.5rem] bg-background border-t border-border pb-[40px]">
      <Link href="/home">
        <Home className={`w-6 h-6 ${pathname === '/challengers' || pathname === '/home' ? 'text-crimson11' : 'text-foreground'}`} />
      </Link>
      <Link href="/leaderboard">
        <Trophy className={`w-6 h-6 ${pathname === '/leaderboard' ? 'text-crimson11' : 'text-foreground'}`} />
      </Link>
      <Link href="/create-post">
        <Plus className={`w-6 h-6 ${pathname === '/create-post' ? 'text-crimson11' : 'text-foreground'}`} />
      </Link>
      <Link href="/dashboard">
        <LayoutDashboard className={`w-6 h-6 ${pathname === '/dashboard' ? 'text-crimson11' : 'text-foreground'}`}  />
      </Link>
      <Link href="/#">
        <Bell className={`w-6 h-6 ${pathname === '/notifications' ? 'text-crimson11' : 'text-foreground'}`} />
      </Link>
    </div>
  );
};

export default TabBar;
