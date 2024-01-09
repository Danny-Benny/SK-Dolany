import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GROUP_ID_MAP, GROUP_ID_MAP_TYPE } from "../../constants";
import { Groups } from "./types";
import DiscussionsSender from "./discussionsSender";

const DiscussionsFeed = () => {
  const { groupId } = useParams();
  const groupIdAsNumber = React.useMemo(() => Number(groupId), [groupId]);
  const groupName = React.useMemo(
    () =>
      Object.keys(GROUP_ID_MAP).find(
        (s) => GROUP_ID_MAP[s as GROUP_ID_MAP_TYPE] === groupIdAsNumber
      )!,
    [groupIdAsNumber]
  );

  const [discussions, setDiscussions] = useState<Groups[]>([]);
  const cached_fetch_discussions = React.useCallback(fetch_discussions, [
    groupId,
  ]);
  function fetch_discussions() {
    fetch(
      `http://localhost:5000/discussions/discussions/byGroupId/${groupId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": localStorage.getItem("token"),
        } as any,
      }
    )
      .then((s) => s.json())
      .then((s) => setDiscussions(s));
  }

  React.useEffect(() => {
    cached_fetch_discussions();
  }, [cached_fetch_discussions]);

  const [newTopic, setNewTopic] = useState<string>("");
  async function saveNewTopic() {
    const response = await fetch(
      "http://localhost:5000/discussions/discussions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": localStorage.getItem("token"),
        } as any,
        body: JSON.stringify({
          group_id: groupId,
          topic: newTopic,
        }),
      }
    );

    if (!response.ok) {
      return;
    }

    console.log(response.json());

    cached_fetch_discussions();
  }

  const [discussionPosts, setDiscussionPosts] = useState<{
    [key: number]: any[];
  }>({});

  function fetchDiscussionPosts(discussionId: number) {
    fetch(
      `http://localhost:5000/discussions_posts/discussions_posts/byDiscussionId/${discussionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": localStorage.getItem("token"),
        } as any,
      }
    )
      .then((response) => response.json())
      .then((posts) => {
        console.log(
          "Fetched posts for discussion ID " + discussionId + ":",
          posts
        );
        setDiscussionPosts((prevPosts) => ({
          ...prevPosts,
          [discussionId]: posts,
        }));
      });
  }

  React.useEffect(() => {
    discussions.forEach((s) => fetchDiscussionPosts(s.discussion_id));
  }, [discussions]);

  return (
    <>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">{groupName}</h2>
        <div className="mb-6">
          <label
            htmlFor="topic_creator"
            className="block text-sm font-medium text-gray-700"
          >
            Téma:
          </label>
          <input
            id="topic_creator"
            name="topic_creator"
            type="text"
            value={newTopic}
            style={{ width: "350px" }}
            onChange={(e) => setNewTopic(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          <button
            onClick={async () => await saveNewTopic()}
            className="mt-2 font-bold py-2 px-3 rounded-md bg-mygreen text-white hover:bg-mygreen2 transition duration-300"
          >
            Odeslat
          </button>
        </div>
      </div>

      {discussions.map((s) => (
        <div
          key={s.discussion_id}
          className="mt-6 bg-white rounded-2xl shadow-xl"
        >
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-lg font-semibold">{s.topic}</p>
            <p className="text-sm text-gray-600">Autor diskuze: {s.username}</p>
            {discussionPosts[s.discussion_id]?.map((post, index) => (
              <div
                key={post.post_id}
                className={`flex ${
                  index % 2 === 1 ? "bg-grey rounded-md" : ""
                }`}
              >
                <div className="w-3/4">
                  <p>{post.content}</p>
                </div>
                <div className="w-1/4">
                  <p className="text-right">Uzivatel: {post.username}</p>
                </div>
              </div>
            ))}
            <DiscussionsSender
              discussionId={s.discussion_id}
              refreshCallback={() => {
                fetchDiscussionPosts(s.discussion_id);
              }}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default DiscussionsFeed;
