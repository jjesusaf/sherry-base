"use client";
import React from "react";
import CardMetrics from "./components/card-metrics";
import ActionCardPostInfo from "./handle/action-card-post-info";
import { useAccount } from "wagmi";
import LoginButton from "../../components/LoginButton";
import SignupButton from "../../components/SignupButton";

const Dashboard: React.FC = () => {
  const { address } = useAccount();
  if (!address) {
    return (
      <div className="flex flex-col gap-4 w-full items-center justify-center h-full min-h-[calc(100vh-259.5px)]">
        Please connect your wallet
        <SignupButton />
      </div>
    );
  }
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
