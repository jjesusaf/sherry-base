"use client";
import React from "react";
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
import { Plus } from "lucide-react";
import EndsCampaign from "./ends-campaign";
import { useWriteContract, useAccount } from "wagmi";
import { Contract, getKolContract } from "@/src/constants";
import { ButtonChain } from "@/src/components/ButtonChain";
import { send } from "process";

interface CardCampaignsProps {
  campaign: Campaign;
}

const CardCampaigns: React.FC<CardCampaignsProps> = ({ campaign }) => {
  const {
    writeContractAsync: createPost,
    isPending,
    isSuccess,
    isError,
  } = useWriteContract();

  const { address } = useAccount();

  const kol: Contract = getKolContract();
  const kolAddress = kol.address.replace(/^0x/, "");

  const sendTx = async () => {
    const tx = await createPost({
      abi: kol.abi,
      address: `0x${kolAddress}`,
      functionName: "addKolToCampaign",
      args: [BigInt(campaign.idCampaign), address],
    });
    return tx;
  };

  return (
    <Card className="flex w-[500px] overflow-hidden">
      <CardHeader className="space-y-2 p-4">
        <div className="flex items-center justify-between">
          <EndsCampaign end_date={campaign.endDate} />

          <Button variant="ghost" size="icon" className="h-8 w-8"></Button>
        </div>
        <h2 className="text-xl font-bold">{campaign.name}</h2>
        <p className="text-sm text-gray-500">
          {campaign.metadata?.description}
        </p>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>6 Posts</span>
          <span>40 Sales</span>
        </div>
        <div className="relative">
          <Card className="overflow-hidden">
            <img
              alt="Summer Camp model"
              className="h-[180px] w-full object-cover"
              src={campaign.metadata?.image}
              style={{
                aspectRatio: "300/180",
                objectFit: "cover",
              }}
            />
          </Card>
          <div className="absolute bottom-2 left-2 bg-white p-2 rounded-lg shadow w-40">
            <h3 className="font-bold">{campaign.metadata?.brand_name}</h3>
            <p className="text-xs text-gray-500">34 challenges</p>
          </div>
        </div>
        <ButtonChain onClick={sendTx} textIfFalse="Sign In" textIfTrue="Subscribe" className="w-full" />
      </CardContent>
    </Card>
  );
};

export default CardCampaigns;
