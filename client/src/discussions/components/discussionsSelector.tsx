import React from "react";
import { useNavigate } from "react-router-dom";
import { GoCommentDiscussion } from "react-icons/go";
import { DiscussionsSelectorProps } from "./types";
import { GROUP_ID_MAP, GROUP_ID_MAP_TYPE } from "../../constants";

const DiscussionsSelector = (props: DiscussionsSelectorProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(
      `/discussions/feed/${GROUP_ID_MAP[props.title as GROUP_ID_MAP_TYPE]}`
    );
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-xl p-6 inline-block text-center ml-3"
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
