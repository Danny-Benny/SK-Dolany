import React, { useState, useEffect } from "react";
import AboutTeam from "./components/aboutTeam";
import AlonePicture from "./components/alonePicture";
import Calendar from "./components/calendar";
import Sponsors from "./components/sponsors";
import News from "./components/news";
import { useAuth } from "../components/auth/AuthContext";
import { NewsProps } from "./components/types";

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
      setNews([...news, newNews]);
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
      setNews(data);
    } else {
      console.error("Failed to fetch news");
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
        className="pt-6 pb-6 mt-6 bg-white shadow-xl rounded-2xl "
        style={{ maxWidth: "1700px" }}
      >
        <h2 className="text-center text-2xl text-mygreen font-bold mb-4">
          Novinky
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
          {[...news].reverse().map((item) => (
            <div key={item.id}>
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
      <div className="pt-6 pb-6">
        <Sponsors />
      </div>
    </div>
  );
};

export default Home;
