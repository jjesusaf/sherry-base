"use client";
import React, { useEffect } from "react";
import ActionCardTopOne from "./handle/action-card-top-one";
import CardTop from "./components/card-top";
import { useAppContext } from "@/src/context/GlobalContext";
import { subGraphVotes } from "../create-post/actions/link";
import { formatTimestamp } from "@/src/utils/timestamp";
import {
  groupVotesByIdPost,
  filterVotesByDate,
  filterVotesByCampaign,
} from "./actions/helper";
import { subGraphPostCreatedsByCampaign } from "@/src/actions/subgraph/posts-by-campaign";

interface ActionCardProps {
  address: string;
  avatar: string;
  name: string;
  username: string;
}

const Leaderboard: React.FC = () => {
  const { setLoading, idCampaign, isLoading, address } = useAppContext();

  const kolData: ActionCardProps = {
    address: address ?? "unkown",
    avatar: "https://github.com/shadcn.png",
    name: "Sherry",
    username: address ?? "unkown",
  };

  useEffect(() => {
    const fetchData = async () => {
      if (idCampaign && !isLoading) {
        try {
          const votesByCampaignId =
            await subGraphPostCreatedsByCampaign(idCampaign);

          if (!(votesByCampaignId.data.postCreateds.length > 0)) return;

          console.log(
            "votesByCampaignId : ",
            votesByCampaignId.data.postCreateds
          );
          const res = await subGraphVotes();
          const { data } = res;
          const votes = data?.voteds;
          if (res.errors) {
            console.log("res.errors : ", res.errors);
            return;
          }

          if (votes.length > 0) {
            const filteredVotes = filterVotesByCampaign(
              votes,
              votesByCampaignId.data.postCreateds
            );
            console.log("filteredVotes : ", filteredVotes);
            const votesByIdPost = groupVotesByIdPost(votes);
            const votesByDate = filterVotesByDate(votes, 7);
            console.log("votesByIdPost : ", votesByIdPost);
            console.log("votesByDate : ", votesByDate);
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      }
    };

    fetchData();
    // debe obtener los posts para saber a que campaña pertenecen
  }, [isLoading, idCampaign]);

  return (
    <div className="flex flex-col w-full items-center gap-[16px]">
      <ActionCardTopOne {...kolData} />
      <CardTop />
    </div>
  );
};

export default Leaderboard;
