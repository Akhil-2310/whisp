"use client";

import { useState } from "react";

const sampleGroups = [
  { id: 1, name: "ZK-Hackathon Builders", description: "Community focused on zero-knowledge circuit development." },
  { id: 2, name: "Privacy Protocol Enthusiasts", description: "Discussing the future of anonymity on Web3." },
];

export default function BrowseGroups() {
  // In the future, fetch data from the contract.
  const [groups] = useState(sampleGroups);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-10">
      <section className="max-w-xl mx-auto space-y-6 p-6">
        <h1 className="text-3xl font-bold text-green-400 text-center mb-6">Browse Anonymous Groups</h1>

        {groups.map(group => (
          <div
            key={group.id}
            className="card bg-gray-800 shadow-xl p-6 space-y-3 border border-gray-700 hover:border-green-500 transition-all duration-300"
          >
            <h2 className="font-bold text-xl text-green-300">{group.name}</h2>
            <p className="text-sm text-gray-400">{group.description}</p>
            <div className="flex gap-4 pt-2">
              <button className="btn btn-outline btn-sm text-green-400 border-green-400 hover:bg-green-700 hover:border-green-700">
                View Details
              </button>
              <button className="btn btn-success btn-sm text-gray-900 font-semibold hover:bg-green-400">
                Join Group
              </button>
            </div>
          </div>
        ))}

        {groups.length === 0 && (
          <p className="text-center text-gray-500">No groups found. Be the first to create one!</p>
        )}
      </section>
    </div>
  );
}
