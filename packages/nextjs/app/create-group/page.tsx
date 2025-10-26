"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export default function CreateGroup() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const { writeContractAsync: writeWhispAsync } = useScaffoldWriteContract({
    contractName: "Whisp",
  });

  const handleCreate = async () => {
    if (!name.trim()) {
      toast.error("Please enter a group name");
      return;
    }

    if (!description.trim()) {
      toast.error("Please enter a group description");
      return;
    }

    setIsCreating(true);

    try {
      await writeWhispAsync({
        functionName: "createGroup",
        args: [name, description],
      });

      toast.success("Group created successfully!");

      // Wait a bit for the transaction to be confirmed
      setTimeout(() => {
        router.push("/browse-groups");
      }, 2000);
    } catch (error: any) {
      console.error("Error creating group:", error);
      toast.error(error.message || "Failed to create group");
    } finally {
      setIsCreating(false);
    }
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
          disabled={isCreating}
        />

        <textarea
          placeholder="Description (What is this group about?)"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="textarea textarea-bordered w-full bg-gray-700 text-gray-200 border-gray-600 focus:border-gray-400 h-32 rounded"
          disabled={isCreating}
        />

        <button
          onClick={handleCreate}
          disabled={isCreating || !name.trim() || !description.trim()}
          className="btn w-full bg-gray-100 text-gray-900 font-bold hover:bg-gray-300 transition-colors disabled:bg-gray-500 disabled:text-gray-300"
        >
          {isCreating ? "Creating Group..." : "Create Group"}
        </button>

        {/* Hint text */}
        <p className="text-xs text-gray-400 text-center pt-2">
          This will create a new anonymous group on the blockchain using Semaphore protocol.
        </p>
      </section>
    </div>
  );
}
