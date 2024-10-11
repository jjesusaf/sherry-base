import React, { useEffect, useState } from "react";
import CardChallenge from "../components/card-challenge";
import { fetchMetadataFromIPFS } from "../actions/ipfs";
import { useAppContext } from "@/src/context/GlobalContext";
import { useParams } from "next/navigation";
import { mergeSubGraphDataByPost } from "../../create-post/actions/link";
import { useAccount } from "wagmi";
import { postDetail } from "../../create-post/actions/link";
import { postDetailData } from "@/src/actions/subgraph/post-by-id";
import { postDetailDataAddress } from "@/src/actions/subgraph/post-by-id";

interface Challenge {
  id_challenge: number;
  id_post: string;
  title: string;
  description: string;
  image: string;
  external_url: string;
  hasVoted: boolean;
  hasVotedCampaign: boolean;
  campaignName: string;
  brandName: string;
  kol: {
    id_kol: number;
    name: string;
    username: string;
    avatar: string;
  };
}

const ActionCardChallenge: React.FC = () => {
  const { setLoading } = useAppContext();
  const { id } = useParams();
  const { address } = useAccount();
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const fetchMetadataAndImageFromIPFS = async (ipfsUrl: string) => {
    try {
      const metadata = await fetchMetadataFromIPFS(ipfsUrl);

      return {
        image: metadata?.image || "/images/example.png",
        title: metadata?.name || `Challenge`,
        description: metadata?.description || `Descripción del post`,
        external_url: metadata?.external_url || `Link url`,
      };
    } catch (error) {
      console.error(
        "Error al obtener metadata de IPFS para la URL:",
        ipfsUrl,
        error
      );
      return {
        image: "/images/example.png",
        title: `Challenge`,
        description: `Descripción del post`,
        external_url: `Link url`,
      };
    }
  };

  const handleSubGraph = async () => {
    if (!address) {
      try {
        setLoading(true);
        const response = await postDetailData(id as string);
        if (response) {
          setChallenges(response);
        }
      } catch (error) {
        console.error("Error al obtener los datos del subGraph:", error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const response = await postDetailDataAddress(id as string, address); // Pasar idPost y address
        if (response) {
          setChallenges(response);
        }
      } catch (error) {
        console.error("Error al obtener los datos del subGraph:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    handleSubGraph();
  }, [address]);

  return (
    <div className="">
      <CardChallenge challenges={challenges} />
    </div>
  );
};

export default ActionCardChallenge;
