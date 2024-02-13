import React, { useState } from "react";
import AboutTeam from "./components/aboutTeam";
import AlonePicture from "./components/alonePicture";
import Calendar from "./components/calendar";
import Sponsors from "./components/sponsors";
import News from "./components/news";
import { useAuth } from "../components/auth/AuthContext";
import { NewsListProps } from "./components/types";

const Home = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [news, setNews] = useState<NewsListProps | null>(null);

  const { isAuthenticated, userRole } = useAuth();

  const postNew = async () => {
    const response = await fetch("/api/news/news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });
    if (response.ok) {
      console.log("News posted");
    } else {
      console.error("Failed to post news");
    }
  };

  const fetchNews = async () => {
    const response = await fetch("/news/news", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data: NewsListProps = await response.json();
      setNews(data);
    }
  };

  const isAdmin = () => isAuthenticated() && userRole === "management";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="pt-6 pb-6 mt-6 bg-white rounded-2xl shadow-xl"
        style={{ maxWidth: "1700px" }}
      >
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
      <div
        className="pt-6 pb-6 mt-6 bg-white rounded-2xl shadow-xl"
        style={{ maxWidth: "1700px", width: "100%" }}
      >
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
        <h2 className="w-full text-center text-2xl text-mygreen font-bold">
          Novinky
        </h2>

        {/* {news?.map((item) => (
          <News
            key={item.id}
            id={item.id}
            titleNews={item.titleNews}
            contentNews={item.contentNews}
            dateNews={item.dateNews}
          />
        ))} */}

        {isAdmin() && (
          <>
            <div className="flex flex-col w-full p-4">
              <input
                type="text"
                placeholder="Titulek"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 border rounded w-full mb-2"
              />
              <textarea
                placeholder="Obsah"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="p-2 border rounded w-full mb-2"
              />
            </div>

            <button
              onClick={postNew}
              className="mt-4 w-4 bg-mygreen text-white py-2 rounded hover:bg-mygreen2 transition duration-300"
            >
              Přidat novinku
            </button>
          </>
        )}
      </div>

      <Sponsors />
    </div>
  );
};

export default Home;
