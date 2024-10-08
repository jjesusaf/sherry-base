"use client";
import React from "react";
import ActionCardTopOne from "./handle/action-card-top-one";
import CardTop from "./components/card-top";

const Leaderboard: React.FC = () => {
  return (
    <div className="flex flex-col w-full items-center gap-[16px]">
      <ActionCardTopOne />
      <CardTop />
    </div>
  );
};

export default Leaderboard;
