import React from "react";
import AboutTeam from "./components/aboutTeam";
import AlonePicture from "./components/alonePicture";

const Home = () => {
  return (
    <div className="pt-20 pb-20 flex">
      <div className="flex-1 pr-6">
        <AboutTeam
          titleAbout={"Historie klubu SK Dolany"}
          paragraphAbout={
            "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas aliquet accumsan leo. Curabitur bibendum justo non orci. Fusce wisi. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Praesent id justo in neque elementum ultrices. Phasellus et lorem id felis nonummy placerat. Etiam egestas wisi a erat. Donec vitae arcu. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. In convallis. Aenean id metus id velit ullamcorper pulvinar."
          }
        />
      </div>
      <div className="flex-1">
        <AlonePicture image={"./assets/alone1.jpg"} />
      </div>
    </div>
  );
};

export default Home;
