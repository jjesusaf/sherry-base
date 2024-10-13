"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "src/components/ui/card";
import Image from "next/image";
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaTiktok,
  FaTwitter,
  FaShare,
} from "react-icons/fa";
import { Challenge } from "@/src/interface/Challenge";
import { Button } from "src/components/ui/button";
import { Share } from "lucide-react";
import MediaPreview from "../../challengers/components/media-previa";

const platformIcons: { [key: string]: JSX.Element } = {
  instagram: (
    <FaInstagram
      className="w-6 h-6 text-pink-600"
      aria-label="Instagram icon"
    />
  ),
  facebook: (
    <FaFacebook className="w-6 h-6 text-blue-600" aria-label="Facebook icon" />
  ),
  youtube: (
    <FaYoutube className="w-6 h-6 text-red-600" aria-label="YouTube icon" />
  ),
  tiktok: <FaTiktok className="w-6 h-6 text-black" aria-label="TikTok icon" />,
  x: (
    <FaTwitter
      className="w-6 h-6 text-blue-400"
      aria-label="X (Twitter) icon"
    />
  ),
};

const contentAbbreviations: { [key: string]: string } = {
  reel: "RL",
  story: "ST",
  short: "SH",
  video: "VD",
  direct_message: "DM",
};

interface CardPostInfoProps {
  challenges: Challenge[];
}

const CardPostInfo: React.FC<CardPostInfoProps> = ({ challenges = [] }) => {
  console.log(challenges);

  return (
    <div className="flex flex-wrap justify-center md:justify-start w-full gap-[24px]">
      {challenges.length > 0 ? (
        challenges.map((challenge) => (
          <Card
            key={challenge.id_challenge}
            className="w-full max-w-[352px] p-[16px] flex gap-[40px]"
          >
            <CardHeader className="flex flex-col gap-[12px]">
              <div className="flex justify-between">
                {platformIcons[challenge.title.toLowerCase()] || (
                  <FaShare
                    className="w-6 h-6"
                    aria-label="Default Share icon"
                  />
                )}
                <span className="text-xs font-medium text-muted-foreground">
                  {contentAbbreviations[challenge.content?.toLowerCase() || ""] ||
                    "CT"}
                </span>
              </div>
              <div>
                <CardDescription>Votes on post</CardDescription>
                <span className="text-[27px] font-medium text-foreground">
                  {challenge.votes}
                </span>
              </div>

              <p className="text-[14px] text-muted-foreground">
                getsherry.link/230294
              </p>
            </CardHeader>
            <CardContent className="p-0 flex flex-col gap-2">
              <MediaPreview
                src={challenge.image || "/placeholder.jpg"}
                alt={challenge.title}
                width={300}
                height={200}
                className="h-[106px] object-cover w-[106px] rounded-[0.375rem]"
              />
              <Button
                variant="outline"
                size="default"
                className="gap-1.5 w-full text-sm"
              >
                <Share className="size-3.5" />
                Copy
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
};

export default CardPostInfo;
