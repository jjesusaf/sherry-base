"use client";
import React, { useContext } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "src/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Badge } from "src/components/ui/badge";

const NavMain: React.FC = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="fixed top-[58px] z-10 left-0 flex items-center gap-4 w-full justify-between p-[16px] bg-background-secondary">
      <Link href="#">
        <Button variant="outline" size="icon" className="h-7 w-7" onClick={handleBack}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </Link>

      <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        Leaderboard
      </h1>
      <div className="flex items-center  gap-2 md:ml-auto">
        <Badge className="bg-transparent text-foreground border border-border px-[10px]">
          Ends in 5 days
        </Badge>
      </div>
    </div>
  );
};

export default NavMain;
