import React from "react";
import { useNavigate } from "react-router-dom";
import { GoCommentDiscussion } from "react-icons/go";
import { DiscussionsSelectorProps } from "./types";

const DiscussionsSelector = (props: DiscussionsSelectorProps) => {
  const navigate = useNavigate();
  const groupIdMap = {
    Verejnost: 1,
    "Občané dolan": 2,
    "Hráči SK": 3,
    "Výbor SK": 4,
  };

  const handleClick = () => {
    navigate(
      `/discussions/feed/${groupIdMap[props.title as keyof typeof groupIdMap]}`
    );
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-xl p-6 inline-block text-center"
      onClick={handleClick}
    >
      <div className="flex flex-col items-center">
        <GoCommentDiscussion size={"70px"} />
        <h2>{props.title}</h2>
      </div>
    </div>
  );
};

export default DiscussionsSelector;
