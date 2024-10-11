import React, { useEffect, useState } from "react";
import CardChallenge from "../components/card-challenge";
import { fetchMetadataFromIPFS } from "../actions/ipfs";
import { useLoading } from "@/src/context/LoadingContext";
import { useParams } from "next/navigation";
import { mergeSubGraphDataByPost } from "../../create-post/actions/link";
import { useAccount } from "wagmi";
import { postDetail } from "../../create-post/actions/link";

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
  const { setLoading } = useLoading();
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
        const response = await postDetail(id as string); 
        console.log(response);
        const post = response.data.postCreateds[0];
        console.log("Esta es la data del post", post);
        if (post) {
          const metadata = await fetchMetadataAndImageFromIPFS(post.url);

          const formattedChallenge: Challenge[] = [
            {
              id_challenge: 1,
              id_post: post.idPost,
              title: metadata.title,
              description: metadata.description,
              image: metadata.image,
              external_url: metadata.external_url,
              hasVoted: post.hasVoted,
              hasVotedCampaign: post.hasVotedCampaign,
              campaignName: post.campaignName,
              brandName: post.brandName,
              kol: {
                id_kol: 1,
                name: ` ${post.kol}`,
                username: `user_${post.kol.slice(0, 6)}`,
                avatar: "https://github.com/shadcn.png",
              },
            },
          ];

          setChallenges(formattedChallenge); // Pasar como array
        } else {
          console.error("No se encontró el post en la respuesta");
        }
      } catch (error) {
        console.error("Error al obtener los datos del subGraph:", error);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const response = await mergeSubGraphDataByPost(id as string, address); // Pasar idPost y address
        const post = response.data.postCreated;
        console.log("Esta es la data del post", post);
        if (post) {
          const metadata = await fetchMetadataAndImageFromIPFS(post.url);

          const formattedChallenge: Challenge[] = [
            {
              id_challenge: 1,
              id_post: post.idPost,
              title: metadata.title,
              description: metadata.description,
              image: metadata.image,
              external_url: metadata.external_url,
              hasVoted: post.hasVoted,
              hasVotedCampaign: post.hasVotedCampaign,
              campaignName: post.campaignName,
              brandName: post.brandName,
              kol: {
                id_kol: 1,
                name: ` ${post.kol}`,
                username: `user_${post.kol.slice(0, 6)}`,
                avatar: "https://github.com/shadcn.png",
              },
            },
          ];

          setChallenges(formattedChallenge); // Pasar como array
        } else {
          console.error("No se encontró el post en la respuesta");
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
