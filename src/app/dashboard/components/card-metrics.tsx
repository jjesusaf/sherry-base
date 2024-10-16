"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "src/components/ui/card";
import { VideoIcon } from "lucide-react";

interface CardMetricsProps {
  title?: string;
  value?: string;
}

const CardMetrics: React.FC<CardMetricsProps> = ({ title, value }) => {
  return (
    <Card className="w-full max-w-[106.67px] p-[24px] flex flex-col items-center justify-center gap-[12px]">
      <CardHeader className="flex items-center">
        <VideoIcon className="w-6 h-6 text-primary" />
        <CardTitle>
          <span className="text-[14px] font-medium">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <span className="text-[24px] font-bold text-primary">{value}</span>
      </CardContent>
    </Card>
  );
};

export default CardMetrics;
