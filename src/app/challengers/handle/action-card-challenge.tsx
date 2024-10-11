import React, { useEffect, useState } from "react";
import CardChallenge from "../components/card-challenge";
import { useAppContext } from "@/src/context/GlobalContext";
import { useAccount } from "wagmi";
import {
  postsByCampaigns,
  postsByCampaignsAndAddress,
} from "@/src/actions/subgraph/posts-by-campaign";
import { Skeleton } from "@/src/components/ui/skeleton";

interface Challenge {
  id_challenge: number;
  id_post: string;
  title: string;
  description: string;
  image: string;
  external_url: string;
  kol: {
    id_kol: number;
    name: string;
    username: string;
    avatar: string;
  };
}

const ActionCardChallenge: React.FC = () => {
  const { setLoading, idCampaign } = useAppContext();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const { address } = useAccount();

  const handleSubGraph = async () => {
    if (!address) {
      try {
        setLoading(true);
        const response = await postsByCampaigns(idCampaign as string);
       
        setChallenges(response ?? []);
      } catch (error) {
        console.error("Error al obtener los datos del subGraph:", error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const response = await postsByCampaignsAndAddress(
          idCampaign as string,
          address
        );

        setChallenges(response ?? []);
      } catch (error) {
        console.error("Error al obtener los datos del subGraph:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    handleSubGraph();
  }, [address, idCampaign]);

  console.log("Challenges:", challenges);

  return (
    <div className="w-full">
      <CardChallenge challenges={challenges} />
    </div>
  );
};

export default ActionCardChallenge;
