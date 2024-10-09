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
import { Instagram, Share, Home } from "lucide-react";

const CardPostInfo: React.FC = () => {
  return (
    <Card className="w-full max-w-[352px] p-[16px] flex gap-[40px]">
      <CardHeader>
        <div>
          <Instagram className="w-6 h-6 text-crimson11" />
        </div>
        <CardTitle>Post title</CardTitle>
        <CardDescription>Votes on post</CardDescription>
        <span>22</span>
        <p>getsherry.link/230294</p>
      </CardHeader>
      <CardContent>
        <CardDescription>Post description</CardDescription>
      </CardContent>
    </Card>
  );
};

export default CardPostInfo;
