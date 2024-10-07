import React from "react";
import { Home, Trophy, Plus, LayoutDashboard, Bell } from "lucide-react";
const TabBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-around items-center  py-[1.5rem] bg-background border-t border-border">
      <Home className="w-6 h-6" />
      <Trophy className="w-6 h-6" />
      <Plus className="w-6 h-6" />
      <LayoutDashboard className="w-6 h-6" />
      <Bell className="w-6 h-6" />
    </div>
  );
};

export default TabBar;
