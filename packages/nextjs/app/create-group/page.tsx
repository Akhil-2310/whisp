// CreateGroup.tsx
"use client";

import { useState } from "react";

// CreateGroup.tsx

// CreateGroup.tsx

// CreateGroup.tsx

// CreateGroup.tsx

// CreateGroup.tsx

// CreateGroup.tsx

// CreateGroup.tsx

// CreateGroup.tsx

// CreateGroup.tsx

// CreateGroup.tsx

export default function CreateGroup() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // TODO: Replace this with a wagmi contract write
  const handleCreate = () => {
    console.log("Creating group:", { name, description });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-10">
      <section className="max-w-lg mx-auto space-y-6 p-6 bg-gray-800 rounded-xl shadow-2xl border border-green-700">
        <h1 className="text-3xl font-bold text-green-400 text-center">Create New Group 🛠️</h1>

        {/* Input fields updated to match dark theme (input-ghost or input-bordered with dark bg) */}
        <input
          type="text"
          placeholder="Group Name (e.g., 'zk-Builders')"
          value={name}
          onChange={e => setName(e.target.value)}
          className="input input-bordered w-full bg-gray-700 text-gray-200 border-green-600 focus:border-green-400"
        />

        <textarea
          placeholder="Description (What is this group about?)"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full bg-gray-700 text-gray-200 border-green-600 focus:border-green-400 h-32"
        />

        <button
          onClick={handleCreate}
          className="btn btn-success w-full text-gray-900 font-bold hover:bg-green-400 transition-colors"
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
