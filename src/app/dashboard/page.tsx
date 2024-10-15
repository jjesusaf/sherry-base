"use client";
import React from "react";
import CardMetrics from "./components/card-metrics";
import ActionCardPostInfo from "./handle/action-card-post-info";
import { useAccount } from "wagmi";
import SignupButton from "../../components/SignupButton";
import { Card } from "@/src/components/ui/card";
import TabsBar from "./components/tabs-bar";
interface Metrics { 
  posts: number;
  views: number;
  votes: number;
}

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = React.useState<Metrics>({
    posts: 0,
    views: 0,
    votes: 0,
  });
  const { address } = useAccount();

  if (!address)
    return (
      <Card className="px-[16px] w-full max-w-[352px] py-[24px] flex justify-center items-center flex-col gap-4">
        <h1 className="text-l font-medium">Please connect your wallet</h1>
        <SignupButton />
      </Card>
    );
  return (
    <div className="flex flex-col gap-4 w-full">
      <TabsBar />
      <h1 className="font-semibold text-[20px] text-left">My metrics</h1>
      <div className="flex items-center justify-center gap-[24px]">
        <CardMetrics title="Posts" value={metrics.posts.toString()} />
        <CardMetrics title="Views" value={metrics.views.toString()} />
        <CardMetrics title="Votes" value={metrics.votes.toString()} />
      </div>
      <h1 className="font-semibold text-[20px] text-left">My posts</h1>
      <ActionCardPostInfo setMetrics={setMetrics} />
    </div>
  );
};

export default Dashboard;
