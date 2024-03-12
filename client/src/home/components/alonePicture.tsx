import React from "react";
import { AlonePictureProps } from "./types";

const AlonePicture = (props: AlonePictureProps) => {
  return (
    <a href="https://foto.obecdolany.cz:5443/#/shared_space/folder/55">
      <img
        src={props.image}
        alt=""
        className="rounded-2xl shadow-xl w-auto h-96"
      />
    </a>
  );
};

export default AlonePicture;
