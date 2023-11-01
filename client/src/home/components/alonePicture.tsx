import React from "react";
import { AlonePictureProps } from "./types";

const AlonePicture = (props: AlonePictureProps) => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 flex flex-col items-center">
      <img
        src={props.image}
        alt=""
        className="rounded-lg w-23 h-23" // Adjust the width and height classes as needed
      />
    </div>
  );
};

export default AlonePicture;
