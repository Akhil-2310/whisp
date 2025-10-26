"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useSemaphoreIdentity } from "~~/hooks/useSemaphoreIdentity";

// Component to fetch and display a single group
function GroupCard({ registryId, onJoinGroup }: { registryId: number; onJoinGroup: (id: number) => void }) {
  const [showDetails, setShowDetails] = useState(false);
  const { address } = useAccount();

  // Fetch group data from contract
  const { data: groupData } = useScaffoldReadContract({
    contractName: "Whisp",
    functionName: "groups",
    args: [BigInt(registryId)],
  });

  // Check if user has already joined
  const { data: hasJoinedData } = useScaffoldReadContract({
    contractName: "Whisp",
    functionName: "hasJoined",
    args: [BigInt(registryId), address as `0x${string}` | undefined],
  });

  const hasJoined = !!hasJoinedData;

  if (!groupData) return null;

  const [groupId, creator, name, description, createdAt, exists] = groupData as [
    bigint,
    string,
    string,
    string,
    bigint,
    boolean,
  ];

  if (!exists) return null;

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) * 1000).toLocaleDateString();
  };

  return (
    <>
      <div className="card bg-gray-800 shadow-xl p-6 space-y-3 border border-gray-700 hover:border-gray-500 transition-all duration-300">
        <h2 className="font-bold text-xl text-gray-100">{name}</h2>
        <p className="text-sm text-gray-400">{description}</p>
        <p className="text-xs text-gray-500">Created: {formatDate(createdAt)}</p>
        <div className="flex gap-4 pt-2">
          <button
            className="btn btn-outline btn-sm text-gray-400 border-gray-600 hover:bg-gray-700 hover:border-gray-700 transition-colors"
            onClick={() => setShowDetails(true)}
          >
            View Details
          </button>
          <button
            className="btn btn-sm bg-gray-100 text-gray-900 font-semibold hover:bg-gray-300 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
            onClick={() => onJoinGroup(registryId)}
            disabled={hasJoined}
          >
            {hasJoined ? "Already Joined" : "Join Group"}
          </button>
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full border border-gray-700 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-100"
              onClick={() => setShowDetails(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            <h2 className="text-3xl font-bold mb-4 text-gray-100 border-b border-gray-700 pb-2">{name}</h2>
            <p className="text-gray-400 mb-6">{description}</p>

            <div className="space-y-3 text-sm">
              <p>
                <strong className="text-gray-300">Registry ID:</strong> {registryId}
              </p>
              <p>
                <strong className="text-gray-300">Group ID:</strong> {groupId.toString()}
              </p>
              <p>
                <strong className="text-gray-300">Creator:</strong>{" "}
                <code className="bg-gray-700 p-1 rounded text-gray-200 text-xs">
                  {creator.slice(0, 6)}...{creator.slice(-4)}
                </code>
              </p>
              <p>
                <strong className="text-gray-300">Created On:</strong> {formatDate(createdAt)}
              </p>
            </div>

            <button
              className="btn w-full mt-6 bg-green-600 text-white font-semibold hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
              onClick={() => {
                setShowDetails(false);
                onJoinGroup(registryId);
              }}
              disabled={hasJoined}
            >
              {hasJoined ? "Already Joined" : "Join This Group"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default function BrowseGroups() {
  const router = useRouter();
  const { isConnected } = useAccount();
  const { identity, identityCommitment } = useSemaphoreIdentity();

  // Read the total number of groups
  const { data: nextGroupIndex } = useScaffoldReadContract({
    contractName: "Whisp",
    functionName: "nextGroupIndex",
  });

  const { writeContractAsync: writeWhispAsync } = useScaffoldWriteContract({
    contractName: "Whisp",
  });

  const handleJoinGroup = async (registryId: number) => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!identity || !identityCommitment) {
      toast.error("Semaphore identity not initialized");
      return;
    }

    try {
      await writeWhispAsync({
        functionName: "joinGroup",
        args: [BigInt(registryId), identityCommitment],
      });

      toast.success("Successfully joined the group!");

      // Redirect to my groups after a short delay
      setTimeout(() => {
        router.push("/my-groups");
      }, 2000);
    } catch (error: any) {
      console.error("Error joining group:", error);
      if (error.message?.includes("Already joined")) {
        toast.error("You have already joined this group");
      } else {
        toast.error(error.message || "Failed to join group");
      }
    }
  };

  const totalGroups = nextGroupIndex ? Number(nextGroupIndex) : 0;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-10">
      <section className="max-w-xl mx-auto space-y-6 p-6">
        <h1 className="text-3xl font-bold text-gray-100 text-center mb-6">Browse Anonymous Groups</h1>

        {totalGroups === 0 && (
          <div className="text-center">
            <p className="text-gray-500 mt-4">No groups found. Be the first to create one!</p>
          </div>
        )}

        {Array.from({ length: totalGroups }, (_, i) => (
          <GroupCard key={i} registryId={i} onJoinGroup={handleJoinGroup} />
        ))}
      </section>
    </div>
  );
}
