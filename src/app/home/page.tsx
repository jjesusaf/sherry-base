"use client";
import React from "react";
import ActionCardCampaigns from "./handle/action-card-campaigns";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 justify-center w-full">
      <h1>Discover challenges</h1>
      <ActionCardCampaigns />
    </div>
  );
};

export default Home;
