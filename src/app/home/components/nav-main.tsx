"use client";
import React, { useContext } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "src/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Badge } from "src/components/ui/badge";

const NavMain: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4 w-full justify-between">
      <Link href="/campaigns">
        <Button variant="outline" size="icon" className="h-7 w-7">
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </Link>

      <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        Home
      </h1>
      <div className="flex items-center gap-2 md:ml-auto">
        <Badge>Badge</Badge>
      </div>
    </div>
  );
};

export default NavMain;
