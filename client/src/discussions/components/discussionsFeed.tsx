import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GROUP_ID_MAP, GROUP_ID_MAP_TYPE } from "../../constants";
import { Groups } from "./types";

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

  return (
    <>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">{groupName}</h2>
        <div className="mb-6">
          <label
            htmlFor="topic_creator"
            className="block text-sm font-medium text-gray-700"
          >
            Topic:
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
            className="mt-2 font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </div>

      {discussions.map((s) => (
        <div className="pt-6 pb-6 mt-6 bg-white rounded-2xl shadow-xl">
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-lg font-semibold">{s.topic}</p>
            <p className="text-sm text-gray-600">Author: {s.author_id}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default DiscussionsFeed;
