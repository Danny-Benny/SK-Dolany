import React from "react";
import { AboutProps } from "./types";

const AboutTeam = (props: AboutProps) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-center text-mygreen">
        {props.titleAbout}
      </h2>
      <p className="text-gray-700">{props.paragraphAbout}</p>
    </div>
  );
};

export default AboutTeam;
