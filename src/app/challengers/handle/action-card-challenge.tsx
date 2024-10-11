import React, { useEffect, useState } from "react";
import CardChallenge from "../components/card-challenge";
import { fetchMetadataFromIPFS } from "../actions/ipfs"; // Importa la acción del IPFS
import { mergeSubGraphDataByAddress } from "../../create-post/actions/link";
import { useLoading } from "@/src/context/LoadingContext";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";


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
  const { setLoading } = useLoading();
  const router = useRouter();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const { address } = useAccount();
  
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
    if(!address) return;
    try {
      setLoading(true);
      //const response = await subGraphPostCreateds();
      const response = await mergeSubGraphDataByAddress(address);
      //console.log("Respuesta del subGraph:", otherResponse);

      const data = response.data;
      console.log(data);

      if (data && data.postCreateds) {
        const mappedChallenges = await Promise.all(
          data.postCreateds.map(async (post: any, index: number) => {
            const metadata = await fetchMetadataAndImageFromIPFS(post.url);
            return {
              id_challenge: index + 1,
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
                id_kol: index + 1,
                name: ` ${post.kol}`,
                username: `user_${post.kol.slice(0, 6)}`,
                avatar: "https://github.com/shadcn.png",
              },
            };
          })
        );
        setChallenges(mappedChallenges);
        console.log(mappedChallenges);
      } else {
        console.error("No se encontraron postCreateds en la respuesta");
      }
    } catch (error) {
      console.error("Error al obtener los datos del subGraph:", error);
    } finally {
      setLoading(false);
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
