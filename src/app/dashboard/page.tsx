"use client";
import React from "react";
import CardMetrics from "./components/card-metrics";
import ActionCardPostInfo from "./handle/action-card-post-info";
const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="font-semibold text-[20px] text-left">My metrics</h1>
      <div className="flex items-center justify-center gap-[24px]">
        <CardMetrics title="Posts" value="3" />
        <CardMetrics title="Views" value="93" />
        <CardMetrics title="Votes" value="45" />
      </div>
      <h1 className="font-semibold text-[20px] text-left">My posts</h1>
      <ActionCardPostInfo />
    </div>
  );
};

export default Dashboard;
