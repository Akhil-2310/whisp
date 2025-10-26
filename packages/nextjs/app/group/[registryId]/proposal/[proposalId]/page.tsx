"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useSemaphoreIdentity } from "~~/hooks/useSemaphoreIdentity";
import { fetchGroupMembers } from "~~/utils/semaphore/groupMembers";
import {
  computeSignalHash,
  createGroupFromCommitments,
  formatProofForContract,
  generateSemaphoreProof,
} from "~~/utils/semaphore/proof";
import { createVote, getProposalById, getVoteCounts } from "~~/utils/supabase/client";

type Proposal = {
  id: string;
  registry_id: number;
  title: string;
  description: string;
  options: string[];
  end_date: string;
  created_at: string;
};

export default function ProposalDetailPage({
  params,
}: {
  params: Promise<{ registryId: string; proposalId: string }>;
}) {
  const resolvedParams = use(params);
  const registryId = parseInt(resolvedParams.registryId);
  const proposalId = resolvedParams.proposalId;
  const router = useRouter();
  const { isConnected } = useAccount();
  const { identity } = useSemaphoreIdentity();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [voteCounts, setVoteCounts] = useState<{ [key: number]: number }>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isVoting, setIsVoting] = useState(false);

  const { writeContractAsync: writeWhispAsync } = useScaffoldWriteContract({
    contractName: "Whisp",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [proposalData, counts] = await Promise.all([getProposalById(proposalId), getVoteCounts(proposalId)]);
        setProposal(proposalData);
        setVoteCounts(counts);
      } catch (error) {
        console.error("Error fetching proposal:", error);
        toast.error("Failed to load proposal");
      }
    };

    fetchData();
  }, [proposalId]);

  const handleVote = async () => {
    if (selectedOption === null) {
      toast.error("Please select an option");
      return;
    }

    if (!isConnected || !identity) {
      toast.error("Please connect your wallet and ensure your identity is initialized");
      return;
    }

    setIsVoting(true);

    try {
      // 1. Fetch actual group members from MemberJoined events
      toast.loading("Fetching group members...");
      const members = await fetchGroupMembers(registryId);
      const group = createGroupFromCommitments(members);
      toast.dismiss();

      // 2. Check if user's identity is in the group
      const userCommitment = identity.commitment;
      const isMember = members.some(member => member === userCommitment);

      if (!isMember) {
        console.error("Identity not found in group!");
        console.error("Your commitment:", userCommitment.toString());
        console.error(
          "Group members:",
          members.map(m => m.toString()),
        );
        toast.error("Your identity is not a member of this group. Please join the group first.");
        return;
      }

      // 3. Message is simply the option index (0, 1, 2, etc.)
      const message = BigInt(selectedOption);

      // 4. Scope must be unique per proposal to prevent nullifier reuse
      // We combine group.root with proposal ID to create a unique scope
      // This allows voting on multiple proposals while preventing double-voting on each
      const proposalIdHash = BigInt(
        "0x" +
          Array.from(new TextEncoder().encode(proposalId))
            .map(b => b.toString(16).padStart(2, "0"))
            .join("")
            .slice(0, 60), // Take first 60 hex chars to avoid overflow
      );
      const scope = group.root ^ proposalIdHash; // XOR to combine them uniquely

      // 5. Generate Semaphore proof
      toast.loading("Generating zero-knowledge proof...");
      const proof = await generateSemaphoreProof(identity, group, message, scope);
      toast.dismiss();

      // 6. Format proof for contract
      const formattedProof = formatProofForContract(proof);

      // 7. Submit proof to contract
      toast.loading("Submitting proof to blockchain...");
      await writeWhispAsync({
        functionName: "validateSignal",
        args: [BigInt(registryId), formattedProof],
      });
      toast.dismiss();

      // 8. Store vote in Supabase
      const signalHash = computeSignalHash(proof.message).toString();
      const nullifier = proof.nullifier.toString();

      await createVote(proposalId, selectedOption, signalHash, nullifier);

      toast.success("Vote submitted successfully!");

      // Refresh vote counts
      const counts = await getVoteCounts(proposalId);
      setVoteCounts(counts);
    } catch (error: any) {
      console.error("Error voting:", error);
      toast.dismiss();
      toast.error(error.message || "Failed to submit vote");
    } finally {
      setIsVoting(false);
    }
  };

  if (!proposal) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <p>Loading proposal...</p>
      </div>
    );
  }

  const isExpired = new Date(proposal.end_date) <= new Date();
  const totalVotes = Object.values(voteCounts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-10 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
          <h1 className="text-3xl font-bold mb-4">{proposal.title}</h1>
          <p className="text-gray-400 mb-6">{proposal.description}</p>

          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Ends: {new Date(proposal.end_date).toLocaleString()}</span>
              <span className={isExpired ? "text-red-500" : "text-green-500"}>
                {isExpired ? "Voting Closed" : "Voting Open"}
              </span>
            </div>
            <div className="text-sm text-gray-500">Total Votes: {totalVotes}</div>
          </div>

          <div className="space-y-4 mb-6">
            <h3 className="text-xl font-semibold">Options</h3>
            {(proposal.options as string[]).map((option, index) => {
              const votes = voteCounts[index] || 0;
              const percentage = totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(1) : 0;

              return (
                <div
                  key={index}
                  onClick={() => !isExpired && setSelectedOption(index)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedOption === index
                      ? "border-blue-500 bg-blue-900 bg-opacity-30"
                      : "border-gray-600 bg-gray-700 hover:border-gray-500"
                  } ${isExpired ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{option}</span>
                    <span className="text-sm text-gray-400">
                      {votes} votes ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${percentage}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          {!isExpired && (
            <div className="flex gap-4">
              <button
                onClick={handleVote}
                disabled={isVoting || selectedOption === null || !isConnected}
                className="btn bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-600"
              >
                {isVoting ? "Submitting Vote..." : "Submit Vote"}
              </button>
              <button
                onClick={() => router.push(`/group/${registryId}`)}
                className="btn bg-gray-700 text-white hover:bg-gray-600"
              >
                Back to Group
              </button>
            </div>
          )}

          {isExpired && (
            <button
              onClick={() => router.push(`/group/${registryId}`)}
              className="btn bg-gray-700 text-white hover:bg-gray-600"
            >
              Back to Group
            </button>
          )}

          <div className="mt-6 bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-4">
            <p className="text-sm text-blue-200">
              🔒 <strong>Anonymous Voting:</strong> Your vote is submitted using zero-knowledge proofs, keeping your
              identity private while proving you&apos;re a group member.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
