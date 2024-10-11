"use client";
import React, { useEffect, useState } from "react";
import CardPostInfo from "../components/card-post-info";
import { useAccount } from "wagmi";
import { postsKol } from "../actions/post-kol";
import { fetchMetadataFromIPFS } from "../../challengers/actions/ipfs";
import { useAppContext } from "@/src/context/GlobalContext";

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



const ActionCardPostInfo: React.FC = () => {
  const { address } = useAccount();
  const { setLoading } = useAppContext();
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
    try {
      if (!address) {
        console.log("No hay wallet");
        return;
      }
      setLoading(true);
      const response = await postsKol(address);
      const data = response;
      console.log(data);

      if (data) {
        const mappedChallenges = await Promise.all(
          data.map(async (post: any, index: number) => {
            const metadata = await fetchMetadataAndImageFromIPFS(post.url);
            return {
              id_challenge: index + 1,
              id_post: post.idPost,
              title: metadata.title,
              description: metadata.description,
              image: metadata.image,
              external_url: metadata.external_url,
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
    if (address) {
      handleSubGraph();
    }
  }, []);
  

console.log(`challenges`, challenges);


  return (
    <div className="flex gap-[16px] flex-wrap items-center justify-center">
      <CardPostInfo challenges={challenges} />
    </div>
  );
};

export default ActionCardPostInfo;
