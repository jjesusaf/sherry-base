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
import { Instagram } from "lucide-react";
import { Challenge } from "@/src/interface/Challenge";


interface CardPostInfoProps {
  challenges: Challenge[];
}

const CardPostInfo: React.FC<CardPostInfoProps> = ({ challenges = [] }) => {
  return (
    <div className="flex flex-wrap justify-center md:justify-start w-full gap-[24px]">
      {challenges.length > 0 ? (
        challenges.map((challenge) => (
          <Card
            key={challenge.id_challenge}
            className="w-full max-w-[352px] p-[16px] flex gap-[40px]"
          >
            <CardHeader>
              <div>
                <Instagram className="w-6 h-6 text-crimson11" aria-label="Instagram icon" />
              </div>
              <CardTitle>{challenge.title}</CardTitle>
              <CardDescription>Votes on post</CardDescription>
              <span>{challenge.votes}</span>
              <p>getsherry.link/230294</p>
            </CardHeader>
            <CardContent>
              <CardDescription className="break-all">{challenge.description}</CardDescription>
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
