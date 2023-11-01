import React from "react";
import { AboutProps } from "./types";

const AboutTeam = (props: AboutProps) => {
  const squareSize = `w-${props.paragraphAbout.length * 2} h-${
    props.paragraphAbout.length * 2
  }`;

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${squareSize}`}>
      <h2 className="text-2xl font-bold mb-4">{props.titleAbout}</h2>
      <p className="text-gray-700">{props.paragraphAbout}</p>
    </div>
  );
};

export default AboutTeam;
