"use client";
import React, { useEffect } from "react";
import ActionCardTopOne from "./handle/action-card-top-one";
import CardTop from "./components/card-top";
import { useAppContext } from "@/src/context/GlobalContext";
import { fetchMetrics } from "./actions/metrics";
import { Metrics } from "@/src/interface/Metrics";
import { calculateUserRanking } from "./actions/metrics";
import { set } from "zod";

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
  const [isLoadingFilter, setIsLoadingFilter] = React.useState<boolean>(true);

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
      setLoading(true);
      console.log("ENTROOO AQUIII");
      if (idCampaign && address) {
        console.log("ENTROOO AQUIII 2");
        setIsLoadingFilter(true);
        try {
          const metrics = await fetchMetrics(idCampaign);
          if (metrics.length > 0) {
            const result = await calculateUserRanking(metrics, address);
            if (result) {
              const { rank, percentage } = result;
              setRank(rank);
              setPercentage(percentage);
            }

            setMetrics(metrics);
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
        } finally {
          setIsLoadingFilter(false);
        }
      }
      setLoading(false);
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
