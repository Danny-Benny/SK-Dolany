import React from "react";
import { GoCommentDiscussion } from "react-icons/go";
import { DiscussionsSelectorProps } from "./types";

const DiscussionsSelector = (props: DiscussionsSelectorProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 inline-block text-center">
      <div className="flex flex-col items-center">
        <GoCommentDiscussion size={"70px"} />
        <h2>{props.title}</h2>
      </div>
    </div>
  );
};

export default DiscussionsSelector;
