import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "src/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "src/components/ui/avatar";


interface Kol {
  id_kol: number;
  name: string;
  username: string;
  avatar: string;
}

interface CardTopOneProps {
  kol: Kol;
}

const CardTopOne: React.FC<CardTopOneProps> = ({ kol }) => {
  return (
    <Card className="px-[16px] w-full max-w-[352px] py-[24px]">
      <CardHeader className="">
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
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default CardTopOne;
