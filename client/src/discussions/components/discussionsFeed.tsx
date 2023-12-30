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
    <div>
      <h2>Jedná se o {groupName}</h2>
      <div style={{ marginBottom: 30 }}>
        <label htmlFor="topic_creator">Topic:</label>
        <input
          id="topic_creator"
          name="topic_creator"
          type="text"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
        />
        <button
          onClick={async () => await saveNewTopic()}
          style={{ background: "red" }}
        >
          Submit
        </button>
      </div>
      {discussions.map((s) => (
        <div style={{ marginTop: 10 }}>
          <p>discussion_id: {s.discussion_id}</p>
          <p>author_id: {s.author_id}</p>
          <p>group_id: {s.group_id}</p>
          <p>topic: {s.topic}</p>
        </div>
      ))}
    </div>
  );
};

export default DiscussionsFeed;
