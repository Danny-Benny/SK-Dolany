import React from "react";
import { NewsProps } from "./types";

const News = (props: NewsProps) => {
  return (
    <div>
      <h2>{props.titleNews}</h2>
      <p className="text-gray-700">{props.contentNews}</p>
    </div>
  );
};

export default News;
