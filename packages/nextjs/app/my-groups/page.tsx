"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { type GroupWithRegistryId, fetchUserGroups } from "~~/utils/semaphore/userGroups";

export default function MyGroups() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const [groups, setGroups] = useState<GroupWithRegistryId[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user's groups from events
  useEffect(() => {
    if (!address || !isConnected) {
      setGroups([]);
      return;
    }

    const loadGroups = async () => {
      setIsLoading(true);
      try {
        const userGroups = await fetchUserGroups(address);
        setGroups(userGroups);
      } catch (error) {
        console.error("Error loading groups:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGroups();
  }, [address, isConnected]);

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) * 1000).toLocaleDateString();
  };

  const handleViewGroup = (registryId: number) => {
    router.push(`/group/${registryId}`);
  };

  if (!isConnected) {
    return (
      <main className="min-h-screen bg-gray-900 text-gray-100 py-10 px-6">
        <section className="max-w-xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-green-400 text-center mb-6">My Anonymous Groups</h1>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
            <p className="text-gray-400 text-center">Please connect your wallet to see your groups.</p>
          </div>
        </section>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-900 text-gray-100 py-10 px-6">
        <section className="max-w-xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-green-400 text-center mb-6">My Anonymous Groups</h1>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
            <p className="text-gray-400 text-center">Loading your groups...</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 py-10 px-6">
      <section className="max-w-xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-green-400 text-center mb-6">My Anonymous Groups</h1>

        {groups.length === 0 ? (
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
            <p className="text-gray-400 text-center mb-4">
              You haven&apos;t joined any groups yet. Browse groups to get started!
            </p>
            <div className="text-center">
              <button
                onClick={() => router.push("/browse-groups")}
                className="btn bg-green-600 text-white hover:bg-green-700"
              >
                Browse Groups
              </button>
            </div>
          </div>
        ) : (
          groups.map(group => (
            <div
              key={group.registryId}
              className="card bg-gray-800 shadow-xl p-6 space-y-3 border border-gray-700 hover:border-green-500 transition-all duration-300"
            >
              <h2 className="font-bold text-xl text-gray-100">{group.name}</h2>
              <p className="text-sm text-gray-400">{group.description}</p>
              <p className="text-xs text-gray-500">Joined on: {formatDate(group.createdAt)}</p>

              <div className="flex gap-4 pt-2">
                <button
                  className="btn btn-sm bg-green-600 text-white hover:bg-green-700"
                  onClick={() => handleViewGroup(group.registryId)}
                >
                  View Group
                </button>
                <button
                  className="btn btn-sm btn-outline border-gray-600 text-gray-400 hover:bg-gray-700 hover:border-gray-700"
                  onClick={() => router.push(`/group/${group.registryId}/create-post`)}
                >
                  Create Post
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
