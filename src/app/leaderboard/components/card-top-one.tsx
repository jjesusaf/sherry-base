import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "src/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "src/components/ui/avatar";
import { Trophy } from "lucide-react";
import { formatAddress } from "@/src/utils/address";
import { SpinnerLeader } from "./spinner";

interface Kol {
  address: string;
  name: string;
  username: string;
  avatar: string;
  rank: number;
  percentage: string;
  total: number;
  isLoading: boolean;
}

interface CardTopOneProps {
  kol: Kol;
}

const CardTopOne: React.FC<CardTopOneProps> = ({ kol }) => {
  return (
    <Card className="px-[16px] w-full max-w-[352px] py-[24px] flex justify-between items-center">
      <CardHeader className="flex gap-[6px]">
        <div className="flex items-center gap-3">
          <Avatar className="w-[40px] h-[40px] rounded-full border border-border items-center justify-center">
            <AvatarImage
              src={kol.avatar}
              alt={`@${kol.username}`}
              className="w-[24px] h-[24px] rounded-full"
            />
            <AvatarFallback>
              {kol.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <CardDescription>{`@${formatAddress(kol.username)}`}</CardDescription>
        </div>
        <CardTitle className="flex flex-row items-center">
          Rank #
          {kol.isLoading ? (
            <div className="mx-2">
              <SpinnerLeader />
            </div>
          ) : (
            kol.rank
          )}
        </CardTitle>
        <CardDescription>1 voter</CardDescription>
      </CardHeader>
      <CardHeader className="flex text-right items-end gap-3">
        <Trophy className={`w-6 h-6`} />
        <CardTitle className="flex flex-row items-center">
          Best{" "}
          {kol.isLoading ? (
            <div className="mx-2">
              <SpinnerLeader />
            </div>
          ) : (
            kol.percentage
          )}
          %
        </CardTitle>
        <CardDescription className="flex flex-row items-center">
          Out of{" "}
          {kol.isLoading ? (
            <div className="mx-2">
              <SpinnerLeader />
            </div>
          ) : (
            kol.total
          )}{" "}
          challengers
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default CardTopOne;
