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
const CardCampaigns: React.FC = () => {
  return (
    <Card className="p-[1rem] flex">
      <CardHeader>
        <CardTitle>Summer Camp 24</CardTitle>
        <CardDescription>
          Show off your best selfies, looking comfortable and sporty
        </CardDescription>
        <Button>Join</Button>
      </CardHeader>
      <CardContent>
        <CardDescription>Card Image</CardDescription>
      </CardContent>
    </Card>
  );
};

export default CardCampaigns;
