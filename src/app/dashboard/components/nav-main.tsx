"use client";
import React, { useContext, useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "src/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Badge } from "src/components/ui/badge";
import { getActiveCampaigns } from "@/src/actions/subgraph/active-campaigns"; 
import EndsCampaign from "../../home/componentes/ends-campaign";
import { useAppContext } from "@/src/context/GlobalContext";
import { usePathname } from "next/navigation";

const NavMain: React.FC =  () => {
  const router = useRouter();
  const pathname = usePathname();
  const { idCampaign } = useAppContext();
  const handleBack = () => {
    router.back();
  };
  const [activeCampaigns, setActiveCampaigns] = useState<any[]>([]);
  const handleActiveCampaigns = async () => {
    const activeCampaigns = await getActiveCampaigns();
    setActiveCampaigns(activeCampaigns);
  }

  useEffect(() => {
    handleActiveCampaigns();
  }, []);

  const campaign = activeCampaigns.find((campaign) => campaign.idCampaign === idCampaign);


  return (
    <div className="fixed top-[58px] z-10 left-0 flex items-center gap-4 w-full justify-between p-[16px] bg-background-secondary">
      <Link href="#">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onClick={handleBack}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </Link>

      <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        Dashboard
      </h1>
      <div className="flex items-center  gap-2 md:ml-auto">
        <EndsCampaign end_date={campaign?.metadata?.end_date} />
      </div>
    </div>
  );
};

export default NavMain;
