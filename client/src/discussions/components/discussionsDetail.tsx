import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DiscussionsSender from "./discussionsSender";

interface Discussion {
  discussion_id: number;
  topic: string;
  username: string;
}

interface Post {
  post_id: number;
  content: string;
  username: string;
}

const DiscussionDetail = () => {
  const { discussionId } = useParams<{ discussionId: string }>();
  const [discussion, setDiscussion] = useState<Discussion | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchDiscussionDetail = async () => {
    const discussionIdNum = parseInt(discussionId ?? "0");

    // Fetch discussion details
    const response = await fetch(
      `/discussions/discussions/${discussionIdNum}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": localStorage.getItem("token"),
        } as any,
      }
    );

    if (response.ok) {
      const data: Discussion = await response.json();
      setDiscussion(data);
    }

    // Fetch posts
    const postsResponse = await fetch(
      `/discussions_posts/discussions_posts/byDiscussionId/${discussionIdNum}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": localStorage.getItem("token"),
        } as any,
      }
    );

    if (postsResponse.ok) {
      const postData: Post[] = await postsResponse.json();
      setPosts(postData);
    }
  };

  useEffect(() => {
    if (discussionId) {
      fetchDiscussionDetail();
    }
  }, [discussionId]);

  if (!discussion) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" bg-white rounded-2xl shadow-xl ">
      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold">{discussion.topic}</h2>
        <p className="text-sm text-gray-600">Author: {discussion.username}</p>
        {posts.map((post, index) => (
          <div
            key={post.post_id}
            className={`flex ${index % 2 === 1 ? "bg-grey rounded-md" : ""}`}
          >
            <div className="w-3/4">
              <p>{post.content}</p>
            </div>
            <div className="w-1/4">
              <p className="text-right">User: {post.username}</p>
            </div>
          </div>
        ))}
        <DiscussionsSender
          discussionId={parseInt(discussionId ?? "0")}
          refreshCallback={fetchDiscussionDetail}
        />
      </div>
    </div>
  );
};

export default DiscussionDetail;
