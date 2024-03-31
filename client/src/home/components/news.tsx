import React from "react";
import { NewsProps } from "./types";

const News = (props: NewsProps) => {
  const parseContent = (content: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return content.replace(
      urlRegex,
      (url) => `<a href="${url}" target="_blank">${url}</a>`
    );
  };

  return (
    <div className="shadow-xl border-solid border-2 p-4 rounded-2xl border-grey mb-3 ">
      <h2 className="font-semibold text-2xl text-gray-800 text-center">
        {props.title}
      </h2>
      <div
        className="text-gray-600 mt-2"
        dangerouslySetInnerHTML={{ __html: parseContent(props.content) }}
      />
      <p className="text-gray-500 text-sm mt-4 text-right">
        {new Date(props.created_at).toLocaleDateString()}
      </p>
    </div>
  );
};

export default News;
