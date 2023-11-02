import React from "react";
import { AlonePictureProps } from "./types";

const AlonePicture = (props: AlonePictureProps) => {
  return (
    <img
      src={props.image}
      alt=""
      className="rounded-2xl shadow-xl w-auto h-96"
    />
  );
};

export default AlonePicture;
