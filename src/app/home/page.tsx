"use client";
import React from "react";
import ActionCardCampaigns from "./handle/action-card-campaigns";

const Home: React.FC = () => {
  return (
    <div className=" w-full flex justify-center">
      <ActionCardCampaigns />
    </div>
  );
};

export default Home;
