"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useSemaphoreIdentity } from "~~/hooks/useSemaphoreIdentity";
import { fetchGroupMembers } from "~~/utils/semaphore/groupMembers";
import {
  computeScopeHash,
  computeSignalHash,
  createGroupFromCommitments,
  formatProofForContract,
  generateSemaphoreProof,
  hashMessage,
} from "~~/utils/semaphore/proof";
import { createPost } from "~~/utils/supabase/client";

export default function CreatePostPage({ params }: { params: Promise<{ registryId: string }> }) {
  const resolvedParams = use(params);
  const registryId = parseInt(resolvedParams.registryId);
  const router = useRouter();
  const { isConnected } = useAccount();
  const { identity } = useSemaphoreIdentity();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch group data to get groupId for Semaphore
  const { data: groupData } = useScaffoldReadContract({
    contractName: "Whisp",
    functionName: "groups",
    args: [BigInt(registryId)],
  });

  const { writeContractAsync: writeWhispAsync } = useScaffoldWriteContract({
    contractName: "Whisp",
  });

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error("Please enter post content");
      return;
    }

    if (!isConnected || !identity) {
      toast.error("Please connect your wallet and ensure your identity is initialized");
      return;
    }

    if (!groupData) {
      toast.error("Group data not loaded");
      return;
    }

    setIsSubmitting(true);

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

      // 3. Hash the message (post content) to use as message
      const message = hashMessage(content);

      // 4. Use group.root as scope (this is the standard Semaphore V4 approach)
      const scope = group.root;

      // 5. Generate Semaphore proof
      toast.loading("Generating zero-knowledge proof... This may take a moment.");
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

      // 8. Store post content in Supabase
      // The signal hash and scope hash are computed on-chain as:
      // signalHash = keccak256(abi.encodePacked(proof.message)) >> 8
      // scopeHash = keccak256(abi.encodePacked(proof.scope)) >> 8
      const signalHash = computeSignalHash(proof.message).toString();
      const scopeHash = computeScopeHash(proof.scope).toString();
      const nullifier = proof.nullifier.toString();

      await createPost(registryId, content, signalHash, scopeHash, nullifier);

      toast.success("Post created successfully!");
      router.push(`/group/${registryId}`);
    } catch (error: any) {
      console.error("Error creating post:", error);
      toast.dismiss();
      toast.error(error.message || "Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-10 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
          <h1 className="text-3xl font-bold mb-6">Create Anonymous Post</h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Post Content</label>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Share your thoughts anonymously..."
                className="textarea textarea-bordered w-full h-40 bg-gray-700 text-gray-200 border-gray-600"
                disabled={isSubmitting}
              />
            </div>

            <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-4">
              <p className="text-sm text-blue-200">
                🔒 <strong>Privacy Notice:</strong> Your post will be published anonymously using zero-knowledge proofs.
                Only members of this group can post, but your identity will remain private.
              </p>
            </div>

            {identity && (
              <div className="bg-gray-700 bg-opacity-50 border border-gray-600 rounded-lg p-3">
                <p className="text-xs text-gray-400">
                  <strong>Your Identity Commitment:</strong>{" "}
                  <code className="text-xs break-all">{identity.commitment.toString()}</code>
                </p>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !content.trim() || !isConnected}
                className="btn bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-600"
              >
                {isSubmitting ? "Publishing..." : "Publish Post"}
              </button>
              <button
                onClick={() => router.push(`/group/${registryId}`)}
                className="btn bg-gray-700 text-white hover:bg-gray-600"
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
