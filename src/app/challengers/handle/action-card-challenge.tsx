import React, { useEffect, useState } from "react";
import CardChallenge from "../components/card-challenge";
import { fetchMetadataFromIPFS } from "../actions/ipfs"; // Importa la acción del IPFS
import { subGraph } from "../../create-post/actions/link";
import { useLoading } from "@/src/context/LoadingContext";

interface Challenge {
  id_challenge: number;
  title: string;
  description: string;
  image: string;
  kol: {
    id_kol: number;
    name: string;
    username: string;
    avatar: string;
  };
}

const ActionCardChallenge: React.FC = () => {
  const { setLoading } = useLoading();
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const fetchImageFromIPFS = async (ipfsUrl: string) => {
    try {
      const metadata = await fetchMetadataFromIPFS(ipfsUrl);
      console.log("Metadata:", metadata);
      return metadata?.image || "/images/example.png";
    } catch (error) {
      console.error("Error al obtener metadata de IPFS para la URL:", ipfsUrl, error);
      return "/images/example.png";
    }
  };
  

  const handleSubGraph = async () => {
    try {
      setLoading(true);
      const response = await subGraph();
      const data = response.data;

      if (data && data.postCreateds) {
   
        const mappedChallenges = await Promise.all(
          data.postCreateds.map(async (post: any, index: number) => {
            const image = await fetchImageFromIPFS(post.url); 
            return {
              id_challenge: index + 1,
              title: `Challenge #${post.idPost}`,
              description: `Descripción para el post #${post.idPost}`,
              image: image,
              kol: {
                id_kol: index + 1,
                name: `KOL ${post.kol}`,
                username: `kol_${post.kol.slice(0, 6)}`,
                avatar: "https://github.com/shadcn.png",
              },
            };
          })
        );

        setChallenges(mappedChallenges);
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
  }, []);

  return (
    <div className="">
      <CardChallenge challenges={challenges} />
    </div>
  );
};

export default ActionCardChallenge;
