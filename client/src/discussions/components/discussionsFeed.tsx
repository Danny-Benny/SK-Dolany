import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DiscussionsFeed = () => {
  const { groupId } = useParams();
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {}, [groupId]);

  return (
    <div>
      <h2>Group Discussions for ID: {groupId}</h2>
    </div>
  );
};

export default DiscussionsFeed;
