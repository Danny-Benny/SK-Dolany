import React from "react";
import AboutTeam from "./components/aboutTeam";
import AlonePicture from "./components/alonePicture";
import Calendar from "./components/calendar";
import Sponsors from "./components/sponsors";
import News from "./components/news";

const news = [
  {
    id: 0,
    titleNews: "Novinky 1",
    contentNews:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas aliquet accumsan leo.",
  },
  {
    id: 1,
    titleNews: "Novinky 2",
    contentNews:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas aliquet accumsan leo.",
  },
];

const Home = () => {
  return (
    <>
      <div className="pt-6 pb-6 mt-6 bg-white rounded-2xl shadow-xl">
        <div className="flex">
          <div className="w-1/2 pl-6">
            <AboutTeam
              titleAbout={"Historie klubu SK Dolany"}
              paragraphAbout={
                "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas aliquet accumsan leo. Curabitur bibendum justo non orci. Fusce wisi. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Praesent id justo in neque elementum ultrices. Phasellus et lorem id felis nonummy placerat. Etiam egestas wisi a erat. Donec vitae arcu. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. In convallis. Aenean id metus id velit ullamcorper pulvinar."
              }
            />
          </div>
          <div className="w-1/2 flex justify-end pr-6 pl-6">
            <AlonePicture image={"./assets/alone1.jpg"} />
          </div>
        </div>
      </div>
      <div className="pt-6 pb-6 mt-6 bg-white rounded-2xl shadow-xl">
        <div className="flex">
          <div className="pl-6">
            <AlonePicture image={"./assets/alone2.jpeg"} />
          </div>
          <div className="flex-grow"></div>
          <div className="pr-6">
            <Calendar />
          </div>
        </div>
      </div>
      <div className="pt-6 pb-6 mt-6 bg-white rounded-2xl shadow-xl">
        {news.map((item) => (
          <News
            id={item.id}
            titleNews={item.titleNews}
            contentNews={item.contentNews}
          />
        ))}
      </div>

      <Sponsors />
    </>
  );
};

export default Home;
