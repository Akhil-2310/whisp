"use client";

import { useState } from "react";

export default function CreateGroup() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // TODO: Replace this with a wagmi contract write
  const handleCreate = () => {
    console.log("Creating group:", { name, description });
  };

  return (
    <section className="max-w-lg mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Create Group</h1>
      <input
        type="text"
        placeholder="Group Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="input input-bordered w-full"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="textarea textarea-bordered w-full"
      />
      <button onClick={handleCreate} className="btn btn-primary w-full">
        Create Group
      </button>
    </section>
  );
}
