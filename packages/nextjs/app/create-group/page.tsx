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
    <div className="min-h-screen bg-gray-900 text-gray-100 py-10">
      <section className="max-w-lg mx-auto space-y-6 p-6 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
        <h1 className="text-3xl font-bold text-gray-100 text-center">Create New Group 🛠️</h1>

        <input
          type="text"
          placeholder="Group Name (e.g., 'zk-Builders')"
          value={name}
          onChange={e => setName(e.target.value)}
          className="input input-bordered w-full bg-gray-700 text-gray-200 border-gray-600 focus:border-gray-400"
        />

        <textarea
          placeholder="Description (What is this group about?)"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full bg-gray-700 text-gray-200 border-gray-600 focus:border-gray-400 h-32"
        />

        <button
          onClick={handleCreate}
          className="btn w-full bg-gray-100 text-gray-900 font-bold hover:bg-gray-300 transition-colors"
        >
          Deploy Group Contract
        </button>

        {/* Hint text */}
        <p className="text-xs text-gray-400 text-center pt-2">
          This action will deploy a new smart contract for your decentralized group.
        </p>
      </section>
    </div>
  );
}
