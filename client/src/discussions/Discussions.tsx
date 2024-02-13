import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../components/auth/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import DiscussionsSender from "./components/discussionsSender";

interface Group {
  username: string;
  discussion_id: number;
  group_id: number;
  author_id: number;
  topic: string;
}

interface DiscussionPost {
  post_id: number;
  username: string;
  content: string;
}

const Discussions = () => {
  const { isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();
  const { groupId } = useParams<string>();
  const [loading, setLoading] = useState(true);
  const [discussions, setDiscussions] = useState<Group[]>([]);
  const [discussionPosts, setDiscussionPosts] = useState<{
    [key: number]: DiscussionPost[];
  }>({});
  const [newTopic, setNewTopic] = useState<string>("");

  // Fetch discussions
  const fetchDiscussions = async () => {
    const response = await fetch(`/discussions/discussions/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": localStorage.getItem("token"),
      } as any,
    });

    if (response.ok) {
      const data = await response.json();
      setDiscussions(data);
    }
  };
  //fetch discussion posts by discussion id
  const fetchDiscussionPosts = async (discussionId: number) => {
    const response = await fetch(
      `/discussions_posts/discussions_posts/byDiscussionId/${discussionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": localStorage.getItem("token"),
        } as any,
      }
    );

    if (response.ok) {
      const data = await response.json();
      setDiscussionPosts((prev) => ({
        ...prev,
        [discussionId]: data,
      }));
    }
  };

  // Check authentication and redirect
  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!isAuthenticated()) {
        navigate("/login");
      } else {
        await fetchDiscussions();
        setLoading(false);
      }
    };

    checkAuthAndRedirect();
  }, [isAuthenticated, navigate, groupId]);

  // Save a new topic
  const saveNewTopic = async () => {
    const response = await fetch("/discussions/discussions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": localStorage.getItem("token"),
      } as any,
      body: JSON.stringify({
        topic: newTopic,
      }),
    });

    if (response.ok) {
      await fetchDiscussions();
      setNewTopic("");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color={"#36D7B7"} loading={loading} size={50} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center pt-4">
      {/* New topic form */}
      <div className="mt-6">
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
          onChange={(e) => setNewTopic(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        <button
          onClick={saveNewTopic}
          className="mt-2 font-bold py-2 px-3 rounded-md bg-mygreen text-white hover:bg-mygreen2 transition duration-300"
        >
          Submit
        </button>
      </div>

      {/* Discussions and new topic form */}

      {discussions.map((discussion) => (
        <div
          key={discussion.discussion_id}
          className="mt-6 bg-white rounded-2xl shadow-xl w-64"
          onClick={() => navigate(`/discussions/${discussion.discussion_id}`)}
          style={{ cursor: "pointer" }}
        >
          {/* Discussion topic */}
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="text-lg font-semibold">{discussion.topic}</p>
            <p className="text-sm text-gray-600">
              Author: {discussion.username}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Discussions;
