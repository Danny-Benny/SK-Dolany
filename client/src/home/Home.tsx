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
    contentNews: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas aliquet accumsan leo.",
    dateNews: "2021-05-05",
  },
  {
    id: 1,
    titleNews: "Novinky 2",
    contentNews: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas aliquet accumsan leo.",
    dateNews: "2021-05-05",
  },
  {
    id: 0,
    titleNews: "Novinky 3",
    contentNews: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas aliquet accumsan leo.",
    dateNews: "2021-05-05",
  },
  {
    id: 1,
    titleNews: "Novinky 4",
    contentNews: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas aliquet accumsan leo.",
    dateNews: "2021-05-05",
  },
];

const Home = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <div className="pt-6 pb-6 mt-6 bg-white rounded-2xl shadow-xl" style={{ maxWidth: "1700px" }}>
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
      <div className="pt-6 pb-6 mt-6 bg-white rounded-2xl shadow-xl" style={{ maxWidth: "1700px", width: "100%" }}>
        <div className="flex" style={{ justifyContent: "space-evenly" }}>
          <div className="pl-6">
            <AlonePicture image={"./assets/alone2.jpeg"} />
          </div>
          <div className="pr-6">
            <Calendar />
          </div>
        </div>
      </div>
      <div
        className="pt-6 pb-6 mt-6 bg-white shadow-xl flex flex-wrap rounded-2xl justify-center items-center"
        style={{ maxWidth: "1700px" }}
      >
        <h2 className="w-full text-center text-2xl text-mygreen font-bold">Novinky</h2>
        {news.map((item) => (
          <News
            key={item.id}
            id={item.id}
            titleNews={item.titleNews}
            contentNews={item.contentNews}
            dateNews={item.dateNews}
          />
        ))}
      </div>

      <Sponsors />
    </div>
  );
};

export default Home;
