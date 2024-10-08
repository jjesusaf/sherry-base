"use client";
import React from "react";
import { Home, Trophy, Plus, LayoutDashboard, Bell } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const TabBar: React.FC = () => {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-around items-center  py-[1.5rem] bg-background border-t border-border">
      <Link href="/challengers">
        <Home className={`w-6 h-6 ${pathname === '/challengers' ? 'text-crimson11' : 'text-foreground'}`} />
      </Link>
      <Link href="/leaderboard">
        <Trophy className={`w-6 h-6 ${pathname === '/leaderboard' ? 'text-crimson11' : 'text-foreground'}`} />
      </Link>
      <Link href="/create-post">
        <Plus className={`w-6 h-6 ${pathname === '/create-post' ? 'text-crimson11' : 'text-foreground'}`} />
      </Link>
      <Link href="#">
        <LayoutDashboard className="w-6 h-6" />
      </Link>
      <Link href="#">
        <Bell className="w-6 h-6" />
      </Link>
    </div>
  );
};

export default TabBar;
