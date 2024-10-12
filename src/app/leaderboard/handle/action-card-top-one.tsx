import React from "react";
import CardTopOne from "../components/card-top-one";

interface ActionCardProps {
  address: string;
  avatar: string;
  name: string;
  username: string;
}

const ActionCardTopOne: React.FC<ActionCardProps> = ({
  address,
  avatar,
  name,
  username,
}) => {
  return (
    <CardTopOne
      kol={{
        address,
        avatar,
        name,
        username,
      }}
    />
  );
};

export default ActionCardTopOne;
