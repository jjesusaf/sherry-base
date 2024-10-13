"use client";
import React, { useEffect } from "react";
import ActionCardTopOne from "./handle/action-card-top-one";
import CardTop from "./components/card-top";
import { useAppContext } from "@/src/context/GlobalContext";
import { fetchMetrics } from "./actions/metrics";
import { Metrics } from "@/src/interface/Metrics";
import { calculateUserRanking } from "./actions/metrics";

interface ActionCardProps {
  address: string;
  avatar: string;
  name: string;
  username: string;
  rank: number;
  percentage: string;
  total: number;
  isLoading: boolean;
}

const Leaderboard: React.FC = () => {
  const { setLoading, idCampaign, isLoading, address } = useAppContext();
  const [metrics, setMetrics] = React.useState<Metrics[]>([]);
  const [rank, setRank] = React.useState<number>(0);
  const [percentage, setPercentage] = React.useState<string>("");
  const [isLoadingFilter, setIsLoadingFilter] = React.useState<boolean>(false);

  const kolData: ActionCardProps = {
    address: address ?? "unkown",
    avatar: "https://github.com/shadcn.png",
    name: "Sherry",
    username: address ?? "unkown",
    rank,
    percentage,
    total: metrics.length,
    isLoading: isLoadingFilter,
  };

  useEffect(() => {
    const fetchData = async () => {
      //setLoading(true);
      setIsLoadingFilter(true);
      let metricsFetch: Metrics[] = [];
      if (idCampaign) {
        metricsFetch = await fetchMetrics(idCampaign);
        if (metricsFetch.length > 0) setMetrics(metricsFetch);
      }

      if (idCampaign && address) {
        try {
          console.log("Calculating user ranking PREV...");
          console.log("Metrics: ", metricsFetch);

          if (metricsFetch.length > 0) {
            console.log("Calculating USER RANKING...");
            console.log("Metrics: ", metricsFetch);
            
            const result = await calculateUserRanking(metricsFetch, address);
            if (result) {
              const { rank, percentage } = result;
              setRank(rank);
              setPercentage(percentage);
            }
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
        } 
      }
      //setLoading(false);
      setIsLoadingFilter(false);
    };

    fetchData();
  }, [idCampaign, address]);

  return (
    <div className="flex flex-col w-full items-center gap-[16px]">
      <ActionCardTopOne {...kolData} />
      <CardTop
        address={address}
        metrics={metrics}
        isLoading={isLoadingFilter}
      />
    </div>
  );
};

export default Leaderboard;
