import React from "react";
import CardTopOne from "../components/card-top-one";

interface ActionCardProps {
  address: string;
  avatar: string;
  name: string;
  username: string;
  rank: number;
  percentage: string;
  total: number;
  isLoading: boolean;
}

const ActionCardTopOne: React.FC<ActionCardProps> = ({
  address,
  avatar,
  name,
  username,
  rank,
  percentage,
  total,
  isLoading
}) => {
  return (
    <CardTopOne
      kol={{
        address,
        avatar,
        name,
        username,
        rank,
        percentage,
        total,
        isLoading
      }}
    />
  );
};

export default ActionCardTopOne;
