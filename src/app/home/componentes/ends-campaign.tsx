import React from "react";
import { Badge } from "@/src/components/ui/badge";
const EndsCampaign: React.FC<{ end_date: number }> = ({ end_date }) => {
  const calculateTimeRemaining = (endDate: number) => {
    const currentDate = Math.floor(Date.now() / 1000); // Fecha actual en timestamp (segundos)
    const timeRemaining = endDate - currentDate;

    if (timeRemaining <= 0) {
      return "Campaign has ended";
    }

    const hoursRemaining = timeRemaining / 3600;
    if (hoursRemaining < 24) {
      return `${Math.floor(hoursRemaining)} hours`;
    }

    const daysRemaining = hoursRemaining / 24;
    return `${Math.floor(daysRemaining)} days`;
  };

  return (
    <Badge className="bg-transparent border-border text-foreground">
      Ends in {calculateTimeRemaining(end_date)}
    </Badge>
  );
};

export default EndsCampaign;
