import React from "react";
import CardChallenge  from "../components/card-challenge";

const ActionCardChallenge: React.FC = () => {
    const challenges = [
        {
          id_challenge: 1,
          title: "What do you think on my skincare routine?",
          description: "Fitness model",
          image: "/images/example.png",
          kol: {
            id_kol: 1,
            name: "Jessica Fit",
            username: "jessicafit",
            avatar: "https://github.com/shadcn.png",
          },
        },
        {
          id_challenge: 2,
          title: "Do you like my new workout routine?",
          description: "Personal Trainer",
          image: "/images/example.png",
          kol: {
            id_kol: 2,
            name: "John Doe",
            username: "johndoe",
            avatar: "https://github.com/shadcn2.png",
          },
        },
      ];

  return (
    <div className="">
        <CardChallenge challenges={challenges} />
    </div>
  );
};

export default ActionCardChallenge;
