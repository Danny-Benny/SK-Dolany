import React, { useState, useEffect } from "react";
import AboutTeam from "./components/aboutTeam";
import AlonePicture from "./components/alonePicture";
import Calendar from "./components/calendar";
import Sponsors from "./components/sponsors";
import News from "./components/news";
import { useAuth } from "../components/auth/AuthContext";
import { NewsProps } from "./components/types";
import Contact from "./components/contact";

const Home = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [news, setNews] = useState<NewsProps[]>([]);

  const { isAuthenticated, userRole } = useAuth();

  useEffect(() => {
    fetchNews();
  }, []);

  const postNew = async () => {
    const response = await fetch("/news/news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });
    if (response.ok) {
      const newNews = await response.json();
      setNews([newNews, ...news]);
      setTitle("");
      setContent("");
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
      const data = await response.json();
      setNews(data.reverse());
    } else {
      console.error("Failed to fetch news");
    }
  };

  const isAdmin = () => isAuthenticated() && userRole === "management";

  const CalendarContainer = () => {
    return (
      <div className="px-6 lg:px-0">
        <Calendar />
      </div>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="max-w-screen-xl mx-auto">
        <div className="pt-6 pb-6 mt-6 bg-white rounded-2xl shadow-xl">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 pl-6 pr-6 lg:pr-0">
              <AboutTeam
                titleAbout={"Historie klubu SK Dolany"}
                paragraphAbout={
                  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas aliquet accumsan leo. Curabitur bibendum justo non orci. Fusce wisi. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Praesent id justo in neque elementum ultrices. Phasellus et lorem id felis nonummy placerat. Etiam egestas wisi a erat. Donec vitae arcu. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. In convallis. Aenean id metus id velit ullamcorper pulvinar."
                }
              />
            </div>
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end pl-6 pr-6">
              <AlonePicture image={"./assets/alone1.jpg"} />
            </div>
          </div>
        </div>

        <div className="pt-6 pb-6 mt-6 bg-white rounded-2xl shadow-xl">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2">
              <div className="hidden lg:block pl-6 pr-6 lg:pr-0">
                <AlonePicture image={"./assets/alone2.jpeg"} />
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
              <CalendarContainer />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 pb-6 mt-6 bg-white shadow-xl rounded-2xl max-w-screen-xl mx-auto">
        <h2 className="text-center text-2xl text-mygreen font-bold mb-4">
          Novinky
        </h2>
        <div className="flex flex-wrap justify-between px-4">
          {news.slice(0, 9).map((item) => (
            <div key={item.id} className="w-full sm:w-1/2 md:w-1/3 p-2">
              <News
                id={item.id}
                title={item.title}
                content={item.content}
                created_at={item.created_at}
              />
            </div>
          ))}
        </div>
      </div>

      {isAdmin() && (
        <>
          <div className="pt-6 pb-6 mt-6 bg-white rounded-2xl shadow-xl flex flex-col justify-between">
            <div className="p-4">
              <input
                type="text"
                placeholder="Titulek"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 border rounded w-full mb-4"
              />
              <textarea
                placeholder="Obsah"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="p-2 border rounded w-full"
                style={{ minHeight: "100px" }}
              />
            </div>

            <div className="flex justify-end p-4">
              <button
                onClick={postNew}
                className="font-bold py-2 px-3 rounded-md bg-mygreen text-white hover:bg-mygreen2 transition duration-300"
                style={{ alignSelf: "flex-end" }}
              >
                Přidat novinku
              </button>
            </div>
          </div>
        </>
      )}
      <div className="">
        <Contact />
      </div>
      <div className="pt-6 pb-6">
        <Sponsors />
      </div>
    </div>
  );
};

export default Home;
