import { createPublicClient, http } from "viem";
import deployedContracts from "~~/contracts/deployedContracts";
import scaffoldConfig from "~~/scaffold.config";
import { getTargetNetworks } from "~~/utils/scaffold-eth/networks";

/**
 * Fetch all members of a group by listening to MemberJoined events
 * @param registryId - The registry ID of the group
 * @returns Array of identity commitments of all members
 */
export async function fetchGroupMembers(registryId: number): Promise<bigint[]> {
  try {
    const targetNetworks = getTargetNetworks();
    const targetNetwork = targetNetworks[0];

    if (!targetNetwork) {
      throw new Error("No target network found");
    }

    const chainId = targetNetwork.id;
    const contracts = deployedContracts[chainId as keyof typeof deployedContracts];

    if (!contracts || !contracts.Whisp) {
      throw new Error(`Whisp contract not found for chain ${chainId}`);
    }

    const whispContract = contracts.Whisp;

    // Create public client for this network
    const rpcUrl =
      scaffoldConfig.rpcOverrides?.[chainId as keyof typeof scaffoldConfig.rpcOverrides] ||
      targetNetwork.rpcUrls.default.http[0];
    const client = createPublicClient({
      chain: targetNetwork,
      transport: http(rpcUrl),
    });

    // Fetch MemberJoined events for this registryId
    const events = await client.getLogs({
      address: whispContract.address as `0x${string}`,
      event: {
        type: "event",
        name: "MemberJoined",
        inputs: [
          {
            indexed: true,
            name: "registryId",
            type: "uint256",
          },
          {
            indexed: true,
            name: "member",
            type: "address",
          },
          {
            indexed: false,
            name: "commitment",
            type: "uint256",
          },
        ],
      },
      args: {
        registryId: BigInt(registryId),
      },
      fromBlock: "earliest",
      toBlock: "latest",
    });

    // Extract commitments from events
    const commitments: bigint[] = [];

    for (const event of events) {
      if (event.args && event.args.commitment) {
        commitments.push(event.args.commitment as bigint);
      }
    }

    if (commitments.length === 0) {
      throw new Error("No members found in this group. Someone must join before creating posts.");
    }

    return commitments;
  } catch (error) {
    console.error("Error fetching group members:", error);
    throw error;
  }
}
