"use client";

import { useState } from "react";

const sampleGroups = [
  { id: 1, name: "Group A", description: "First group" },
  { id: 2, name: "Group B", description: "Second group" },
];

export default function BrowseGroups() {
  // In the future, fetch data from the contract.
  const [groups] = useState(sampleGroups);

  return (
    <section className="max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Browse Groups</h1>
      {groups.map(group => (
        <div key={group.id} className="card bg-base-100 shadow-md p-4 space-y-2">
          <h2 className="font-semibold text-lg">{group.name}</h2>
          <p className="text-sm text-gray-500">{group.description}</p>
          <div className="flex gap-4">
            <button className="btn btn-outline btn-sm">View Group</button>
            <button className="btn btn-primary btn-sm">Join Group</button>
          </div>
        </div>
      ))}
    </section>
  );
}
