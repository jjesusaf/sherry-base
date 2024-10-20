"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "src/components/ui/card";
import { Button } from "src/components/ui/button";
import { Campaign } from "@/src/interface/Campaign";
import Image from "next/image";
import EndsCampaign from "./ends-campaign";
import { useWriteContract, useAccount } from "wagmi";
import { Contract, getKolContract } from "@/src/constants";
import { ButtonChain } from "@/src/components/ButtonChain";
import { PlusIcon, StarIcon, Wallet2Icon } from "lucide-react";
import { useAppContext } from "@/src/context/GlobalContext";
import { useRouter } from "nextjs-toploader/app";
import { postsByCampaigns } from "@/src/actions/subgraph/posts-by-campaign";
import { campaignsByIdBrand } from "@/src/actions/subgraph/campaigns-by-idbrand";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";

interface CardCampaignsProps {
  campaign: Campaign;
  id_campaign: number;
}

const CardCampaigns: React.FC<CardCampaignsProps> = ({
  campaign,
  id_campaign,
}) => {
  const [postCount, setPostCount] = useState(0);
  const [postByBrand, setPostByBrand] = useState(0);
  const {
    writeContractAsync: addKolToCampaign,
    isPending,
    isSuccess,
    isError,
  } = useWriteContract();
  const { setIdCampaign, setLoading } = useAppContext();
  const router = useRouter();

  const { address } = useAccount();

  const kol: Contract = getKolContract();
  const kolAddress = kol.address.replace(/^0x/, "");

  const sendTx = async () => {
    setLoading(true);
    const tx = await addKolToCampaign({
      abi: kol.abi,
      address: `0x${kolAddress}`,
      functionName: "addKolToCampaign",
      args: [BigInt(campaign.idCampaign), address],
    });
    setLoading(false);
    return tx;
  };

  const handleSubGraph = async () => {
    try {
      const result = await postsByCampaigns(campaign.idCampaign.toString());
      const resultBrand = await campaignsByIdBrand(campaign.idBrand.toString());
      if (result) {
        setPostCount(result.length);
      }
      if (resultBrand) {
        setPostByBrand(resultBrand.length);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
    }
  };

  const handleNavigateChallenge = () => {
    setIdCampaign(campaign.idCampaign.toString());
    router.push(`/challengers`);
  };

  const handleCreatePost = () => {
    setIdCampaign(campaign.idCampaign.toString());
    router.push(`/create-post`);
  };

  useEffect(() => {
    if (!id_campaign) return;
    console.log("ID CAMPAIGN", id_campaign);
    const fetchData = async () => {
      await handleSubGraph();
    };

    fetchData();
  }, []);

  return (
    <Card className="flex max-w-[352px] w-full gap-[10px] items-center justify-between p-4">
      <CardHeader className="flex flex-col gap-2 h-[220px]">
        <div className="flex items-center justify-between">
          <EndsCampaign end_date={campaign?.endDate} />
        </div>
        <h2 className="text-xl font-bold mt-0" style={{ margin: 0 }}>
          {campaign.name.split(' ').slice(0, 3).join(' ')}
        </h2>
        <p
          className="text-sm mt-0 text-muted-foreground h-[72px] overflow-y-scroll"
          style={{ margin: 0 }}
        >
          {campaign.metadata?.description}
        </p>
        <span
          className="text-sm text-muted-foreground
        "
        >
          {postCount} Posts
        </span>
        {campaign.subscribed ? (
          <Button
            variant="outline"
            className="w-full text-black cursor-pointer"
            onClick={handleCreatePost}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Create post
          </Button>
        ) : (
          <div
            className={`${address ? "flex items-center gap-2 justify-center rounded-[8px] w-full border border-border max-w-[116px] relative " : "flex relative"}`}
          >
            {address ? <StarIcon className="h-[14px] w-[14px]" /> : ""}

            <ButtonChain
              onClick={sendTx}
              textIfFalse=""
              textIfTrue="Subscribe"
              className={`${address ? "bg-transparent p-0 text-[14px] text-black  font-medium" : ""}`}
            />
          </div>
        )}
      </CardHeader>
      <Card
        className="p-0 max-w-[140px] w-full flex flex-col h-fit justify-center cursor-pointer"
        onClick={handleNavigateChallenge}
      >
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Image
                alt={campaign.metadata?.brand_name || "Campaign image"}
                src={campaign.metadata?.image || "/placeholder.jpg"}
                width={300}
                height={180}
                style={{ objectFit: "cover" }}
                className="w-full object-cover rounded-t-[8px] h-[140px]"
              />
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              sticky="always"
              className="bg-black/95 text-white"
            >
              <p>More Details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <CardContent className=" px-[1rem] pt-[1.75rem] pb-[1rem]">
          <h3 className="font-bold">{campaign.metadata?.brand_name}</h3>
          <p className="text-xs text-gray-500">{postByBrand} challenges</p>
        </CardContent>
      </Card>
    </Card>
  );
};

export default CardCampaigns;
