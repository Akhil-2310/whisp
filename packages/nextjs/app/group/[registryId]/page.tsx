"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { type Post, type Proposal, getPostsByGroup, getProposalsByGroup } from "~~/utils/supabase/client";

type Group = {
  groupId: bigint;
  creator: string;
  name: string;
  description: string;
  createdAt: bigint;
  exists: boolean;
};

export default function GroupDetailPage({ params }: { params: Promise<{ registryId: string }> }) {
  const resolvedParams = use(params);
  const registryId = parseInt(resolvedParams.registryId);
  const router = useRouter();
  const { isConnected } = useAccount();
  const [posts, setPosts] = useState<Post[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [activeTab, setActiveTab] = useState<"posts" | "proposals">("posts");

  // Fetch group data
  const { data: groupData } = useScaffoldReadContract({
    contractName: "Whisp",
    functionName: "groups",
    args: [BigInt(registryId)],
  });

  // Parse the tuple returned from the contract
  let group: Group | undefined;
  if (groupData) {
    const [groupId, creator, name, description, createdAt, exists] = groupData as [
      bigint,
      string,
      string,
      string,
      bigint,
      boolean,
    ];
    group = {
      groupId,
      creator,
      name,
      description,
      createdAt,
      exists,
    };
  }

  // Fetch posts and proposals from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, proposalsData] = await Promise.all([
          getPostsByGroup(registryId),
          getProposalsByGroup(registryId),
        ]);
        setPosts(postsData);
        setProposals(proposalsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [registryId]);

  if (!group || !group.exists) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Group Not Found</h1>
          <button onClick={() => router.push("/browse-groups")} className="btn bg-gray-700">
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Group Header */}
        <div className="bg-gray-800 rounded-xl p-8 mb-6 border border-gray-700">
          <h1 className="text-4xl font-bold mb-4">{group.name}</h1>
          <p className="text-gray-400 mb-4">{group.description}</p>
          <div className="flex gap-4">
            <button
              onClick={() => router.push(`/group/${registryId}/create-post`)}
              className="btn bg-green-600 text-white hover:bg-green-700"
              disabled={!isConnected}
            >
              Create Post
            </button>
            <button
              onClick={() => router.push(`/group/${registryId}/create-proposal`)}
              className="btn bg-blue-600 text-white hover:bg-blue-700"
              disabled={!isConnected}
            >
              Create Proposal
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("posts")}
            className={`btn ${activeTab === "posts" ? "bg-gray-700" : "bg-gray-800"} text-white`}
          >
            Posts ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab("proposals")}
            className={`btn ${activeTab === "proposals" ? "bg-gray-700" : "bg-gray-800"} text-white`}
          >
            Proposals ({proposals.length})
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {activeTab === "posts" && (
            <>
              {posts.length === 0 ? (
                <div className="bg-gray-800 rounded-lg p-8 text-center border border-gray-700">
                  <p className="text-gray-400">No posts yet. Be the first to post!</p>
                </div>
              ) : (
                posts.map(post => (
                  <div key={post.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <p className="text-gray-200 mb-2">{post.content}</p>
                    <p className="text-xs text-gray-500">
                      Posted anonymously on {new Date(post.created_at).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </>
          )}

          {activeTab === "proposals" && (
            <>
              {proposals.length === 0 ? (
                <div className="bg-gray-800 rounded-lg p-8 text-center border border-gray-700">
                  <p className="text-gray-400">No proposals yet. Create the first proposal!</p>
                </div>
              ) : (
                proposals.map(proposal => (
                  <div
                    key={proposal.id}
                    className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-all cursor-pointer"
                    onClick={() => router.push(`/group/${registryId}/proposal/${proposal.id}`)}
                  >
                    <h3 className="text-xl font-bold mb-2">{proposal.title}</h3>
                    <p className="text-gray-400 mb-4">{proposal.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Options: {(proposal.options as string[]).length}</span>
                      <span>Ends: {new Date(proposal.end_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
