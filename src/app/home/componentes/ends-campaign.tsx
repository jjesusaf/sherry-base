import React from "react";

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
    <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium whitespace-nowrap">
      Ends in {calculateTimeRemaining(end_date)}
    </span>
  );
};

export default EndsCampaign;
