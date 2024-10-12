import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "src/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "src/components/ui/avatar";
import { Trophy } from "lucide-react";

interface Kol {
  address: string;
  name: string;
  username: string;
  avatar: string;
}

interface CardTopOneProps {
  kol: Kol;
}

const CardTopOne: React.FC<CardTopOneProps> = ({ kol }) => {
  const formatAddress = (address: string): string => {
    if (address.length <= 8) {
      return address;
    }
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

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
        <CardTitle>Rank #232</CardTitle>
        <CardDescription>1 voter</CardDescription>
      </CardHeader>
      <CardHeader className="flex text-right items-end gap-3">
        <Trophy className={`w-6 h-6`} />
        <CardTitle>Best 10%</CardTitle>
        <CardDescription>Out of 3,202 challengers</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default CardTopOne;
