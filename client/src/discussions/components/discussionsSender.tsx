import { useState } from "react";

interface Props {
  discussionId: number;
  refreshCallback: () => void;
}
const DiscussionsSender = (props: Props) => {
  const [newPost, setNewPost] = useState<string>("");
  async function saveNewPost(discussionId: number) {
    const response = await fetch(
      "http://localhost:5000/discussions_posts/discussions_posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": localStorage.getItem("token"),
        } as any,
        body: JSON.stringify({
          discussion_id: discussionId,
          content: newPost,
        }),
      }
    );

    if (!response.ok) {
      return;
    }

    console.log(response.json());

    props.refreshCallback();
    setNewPost("");
  }

  return (
    <>
      <div className="mt-6">
        <label
          htmlFor="post_creator"
          className="block text-sm font-medium text-gray-700"
        >
          Příspěvek:
        </label>
        <input
          id="post_creator"
          name="post_creator"
          type="text"
          value={newPost}
          style={{ width: "350px" }}
          onChange={(e) => setNewPost(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        <button
          onClick={async () => await saveNewPost(props.discussionId)}
          className="mt-2 font-bold py-2 px-3 rounded-md bg-mygreen text-white hover:bg-mygreen2 transition duration-300"
        >
          Odeslat
        </button>
      </div>
    </>
  );
};

export default DiscussionsSender;
