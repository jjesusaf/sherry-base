"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { Bot, Share, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "src/components/ui/avatar";
import WalletWrapper from "src/components/WalletWrapper";
import { useAccount } from "wagmi";
import TransactionWrapper from "src/components/TransactionWrapper";

interface Kol {
  id_kol: number;
  name: string;
  username: string;
  avatar: string;
}

interface Challenge {
  id_challenge: number;
  title: string;
  description: string;
  image: string;
  kol: Kol;
}

interface CardChallengeProps {
  challenges: Challenge[];
}

const CardChallenge: React.FC<CardChallengeProps> = ({ challenges = [] }) => {
  const { address } = useAccount();
  return (
    <div className="flex flex-wrap items-center justify-center gap-[30px]">
      {challenges.length > 0 ? (
        challenges.map((challenge) => (
          <div key={challenge.id_challenge} className="max-w-[352px] w-full flex flex-col gap-3">
            <Card className="border-none bg-transparent shadow-none flex justify-between">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Avatar className="w-[40px] h-[40px] rounded-full border border-border items-center justify-center">
                    <AvatarImage
                      src={challenge.kol.avatar}
                      alt={`@${challenge.kol.username}`}
                      className="w-[24px] h-[24px] rounded-full"
                    />
                    <AvatarFallback>
                      {challenge.kol.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <CardTitle>@{challenge.kol.username}</CardTitle>
                    <CardDescription className="break-all">{challenge.kol.name}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </Card>
            <Card>
              <CardContent className="p-0">
                <Image
                  src={challenge.image}
                  alt={challenge.title}
                  width={300}
                  height={200}
                  className="w-full h-[440px]"
                />
              </CardContent>
              <CardFooter className="p-[16px] flex flex-col gap-2 w-full">
                <div className="flex justify-between py-[12px] items-center text-[12px] gap-2 text-center">
                  <p className="font-semibold">@{challenge.kol.username}</p>
                  <p>{challenge.title}</p>
                </div>
                <div className="flex w-full justify-between">
                  <Button
                    variant="outline"
                    size="default"
                    className="gap-1.5 text-sm"
                  >
                    <Share className="size-3.5" />
                    Share
                  </Button>
                  {/**      {address ? (
                    <>
                      <TransactionWrapper address={address} />
                    </>
                  ) : (
                    <WalletWrapper
                      className="w-[20px]px-4 py-2 gap-2 bg-crimson11"
                      text="Vote"
                    />
                  )} */}
                  <Button className="px-4 py-2 gap-2 bg-crimson11 items-center">
                    Vote
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        ))
      ) : (
        <p>No challenges available</p>
      )}
    </div>
  );
};

export default CardChallenge;
