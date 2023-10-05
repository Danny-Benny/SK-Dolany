import React, { useState } from "react";

const TestBe = () => {
  const [title, setTitle] = useState("");

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const body = { title };
      const response = fetch("localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <input
        type="text"
        className="border-2 border-black rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="border-3 rounded bg-blue-400 w-auto">Add</button>
    </div>
  );
};

export default TestBe;
