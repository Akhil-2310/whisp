"use client";

import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const sampleGroups = [
  {
    id: 1,
    name: "ZK-Hackathon Builders",
    description: "Community focused on zero-knowledge circuit development and competition.",
    contractAddress: "0x1234...ABCD",
    totalMembers: 45,
    governanceRules: "1-member, 1-vote",
    dateCreated: "2025-10-25",
  },
  {
    id: 2,
    name: "Privacy Protocol Enthusiasts",
    description: "Discussing the future of anonymity on Web3 and secure messaging protocols.",
    contractAddress: "0x5678...EFGH",
    totalMembers: 120,
    governanceRules: "Proof-of-stake weighted voting",
    dateCreated: "2025-09-15",
  },
];

type Group = (typeof sampleGroups)[0];

export default function BrowseGroups() {
  const [groups] = useState(sampleGroups);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const handleViewDetails = (group: Group) => {
    setSelectedGroup(group);
    setShowDetailsModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-10">
      <section className="max-w-xl mx-auto space-y-6 p-6">
        <h1 className="text-3xl font-bold text-gray-100 text-center mb-6">Browse Anonymous Groups</h1>

        {groups.map(group => (
          <div
            key={group.id}
            className="card bg-gray-800 shadow-xl p-6 space-y-3 border border-gray-700 hover:border-gray-500 transition-all duration-300"
          >
            <h2 className="font-bold text-xl text-gray-100">{group.name}</h2>
            <p className="text-sm text-gray-400">{group.description}</p>
            <div className="flex gap-4 pt-2">
              <button
                className="btn btn-outline btn-sm text-gray-400 border-gray-600 hover:bg-gray-700 hover:border-gray-700 transition-colors"
                onClick={() => handleViewDetails(group)}
              >
                View Details
              </button>
              <button className="btn btn-sm bg-gray-100 text-gray-900 font-semibold hover:bg-gray-300 transition-colors">
                Join Group
              </button>
            </div>
          </div>
        ))}

        {groups.length === 0 && (
          <p className="text-center text-gray-500">No groups found. Be the first to create one!</p>
        )}
      </section>

      {/* (Popup) --- */}
      {showDetailsModal && selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full border border-gray-700 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-100"
              onClick={() => setShowDetailsModal(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <h2 className="text-3xl font-bold mb-4 text-gray-100 border-b border-gray-700 pb-2">
              {selectedGroup.name}
            </h2>
            <p className="text-gray-400 mb-6">{selectedGroup.description}</p>

            <div className="space-y-3 text-sm">
              <p>
                <strong className="text-gray-300">Total Members:</strong> {selectedGroup.totalMembers}
              </p>
              <p>
                <strong className="text-gray-300">Governance Rules:</strong> {selectedGroup.governanceRules}
              </p>
              <p>
                <strong className="text-gray-300">Contract Address:</strong>{" "}
                <code className="bg-gray-700 p-1 rounded text-gray-200 text-xs">{selectedGroup.contractAddress}</code>
              </p>
              <p>
                <strong className="text-gray-300">Created On:</strong> {selectedGroup.dateCreated}
              </p>
            </div>

            <button
              className="btn w-full mt-6 bg-gray-100 text-gray-900 font-semibold hover:bg-gray-300"
              onClick={() => setShowDetailsModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
