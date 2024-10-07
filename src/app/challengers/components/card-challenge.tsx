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

const CardChallenge: React.FC = () => {
  return (
    <div className="flex flex-col gap-[16px] max-w-[352px] w-full">
      <Card className="border-none bg-transparent shadow-none flex justify-between">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Avatar className="w-[40px] h-[40px] rounded-full border border-border items-center justify-center">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="w-[24px] h-[24px] rounded-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <CardTitle>@jessicafit</CardTitle>
              <CardDescription>Fitness model</CardDescription>
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
            src="/images/example.png"
            alt="image"
            width={300}
            height={200}
            className="w-full h-[440px]"
          />
        </CardContent>
        <CardFooter className="p-[16px] flex flex-col gap-2 w-full">
          <div className="flex justify-between py-[12px] items-center text-[12px] gap-2 text-center">
            <p className="font-semibold">@jessicafit</p>
            <p>What do you think on my skincare routine?</p>
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
            <Button className=" px-4 py-2 gap-2 bg-crimson11 items-center">
              Vote
              <Bot className="text-[18px]" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardChallenge;
