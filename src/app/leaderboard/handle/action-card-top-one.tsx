import React from "react";
import CardTopOne from "../components/card-top-one";
const ActionCardTopOne: React.FC = () => {
  const kolData = {
    id_kol: 1,
    name: "Jessica Fit",
    username: "jessicafit",
    avatar: "https://github.com/shadcn.png",
  };
  return <CardTopOne kol={kolData} />;
};

export default ActionCardTopOne;
