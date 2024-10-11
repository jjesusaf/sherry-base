"use client";
import React, { useEffect, useState } from "react";
import CardPostInfo from "../components/card-post-info";
import { useAccount } from "wagmi";
import { postsKol } from "../actions/post-kol";
import { fetchMetadataFromIPFS } from "../../challengers/actions/ipfs";
import { useLoading } from "@/src/context/LoadingContext";
import {
  subGraphPostCreateds,
  subGraphVotes,
} from "../../create-post/actions/link";

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
interface Metrics {
  posts: number;
  views: number;
  votes: number;
}

interface Vote {
  idPost: string;
}

interface Post {
  idPost: string;
}

interface ChildComponentProps {
  setMetrics: React.Dispatch<React.SetStateAction<Metrics>>;
}

const ActionCardPostInfo: React.FC<ChildComponentProps> = ({ setMetrics }) => {
  const { address } = useAccount();
  const { setLoading } = useLoading();
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
    let postsMetrics = 0;
    let viewsMetrics = 0;
    let votesMetrics = 0;

    try {
      //if (!address) return;

      setLoading(true);
      const response = await postsKol(address!);
      console.log("response : ", response);
      console.log("address : ", address);
      const votesByPostsKol = await subGraphVotes();

      if (votesByPostsKol.data) {
        votesByPostsKol.data.voteds.map((vote: any) => {
          //console.log("Vote : ", vote);
        });
      }
      //console.log("response : ", response);
      const data = response;
      //console.log(data);

      if (data) {
        postsMetrics = data.length;

        const votesCountMap: { [key: string]: number } = {};
        votesByPostsKol.data.voteds.forEach((vote: Vote) => {
          if (votesCountMap[vote.idPost]) {
            votesCountMap[vote.idPost]++;
          } else {
            votesCountMap[vote.idPost] = 1;
          }
        });

        console.log("votesCountMap : ", votesCountMap);

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

        const userPostIds = response.map((post: Post) => post.idPost);
        console.log("userPostIds : ", userPostIds);
        const userVotes = votesByPostsKol.data.voteds.filter((vote: Vote) =>
          userPostIds.includes(vote.idPost)
        );

        votesMetrics = userVotes.length;

        setChallenges(mappedChallenges);
        console.log(mappedChallenges);
      } else {
        console.error("No se encontraron postCreateds en la respuesta");
      }
    } catch (error) {
      console.error("Error al obtener los datos del subGraph:", error);
    } finally {
      setLoading(false);
      setMetrics({
        posts: postsMetrics,
        views: viewsMetrics,
        votes: votesMetrics,
      });
    }
  };

  useEffect(() => {
    handleSubGraph();
  }, []);

  console.log(`challenges`, challenges);

  return (
    <div className="flex gap-[16px] flex-wrap items-center justify-center">
      <CardPostInfo challenges={challenges} />
    </div>
  );
};

export default ActionCardPostInfo;
