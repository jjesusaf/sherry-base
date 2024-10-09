"use client";
import React from "react";
import CardPostInfo from "../components/card-post-info";

const ActionCardPostInfo: React.FC = () => {
  return (
    <div className="flex gap-[16px] flex-wrap items-center justify-center">
      <CardPostInfo />
      <CardPostInfo />
    </div>
  );
};

export default ActionCardPostInfo;
