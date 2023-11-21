import React from "react";
import { NewsProps } from "./types";

const News = (props: NewsProps) => {
  return (
    <div className="shadow-xl border-solid border-2 p-4 rounded-2xl border-grey mb-3 s">
      <h2 className="text-xl text-black">{props.titleNews}</h2>
      <p className="text-gray-700">{props.contentNews}</p>
      <p className="text-gray-700">{props.dateNews}</p>
    </div>
  );
};

export default News;
