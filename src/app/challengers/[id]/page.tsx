"use client";
import React from "react";
import { postDetail } from "../actions/graph";
import { useParams } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import ActionCardPostDetail from "../handle/action-card-post-detail";
const ChallengeDetailsPage: React.FC = () => {
  const { id } = useParams();

  const handleData = async () => {
    const data = await postDetail("2");
    console.log(data);
  };

  return (
    <div className="w-full">
      <ActionCardPostDetail />
    </div>
  );
};

export default ChallengeDetailsPage;
