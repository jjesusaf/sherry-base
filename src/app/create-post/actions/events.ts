"use server"
import { decodeEventLog } from "viem";
import { getTransactionReceipt } from "wagmi/actions";
import { BASE_SEPOLIA_CHAIN_ID } from "@/src/constants";
import { Contract, getSherryContract } from "@/src/constants";
import { DecodeEventLogReturnType } from "viem";
import { config } from "@/lib/wagmiClient";

const sherry: Contract = getSherryContract();

export async function getTransactionEvents(hash: string) {
    const finalHash = hash.replace(/^0x/, "");
    try {
        const receipt = await getTransactionReceipt(config, {
            hash: `0x${finalHash}`,
            chainId: BASE_SEPOLIA_CHAIN_ID,
        })

        const events = receipt.logs.map(log => {
            try {
                const event = decodeEventLog({
                    abi: sherry.abi,
                    data: log.data,
                    topics: log.topics,
                });

                return event as DecodeEventLogReturnType;
            } catch (error) {
                return null;
            }
        }).filter(event => event !== null);

        if (events.length === 0) {
            return null;
        }

        let eventResult = events[0].args as unknown as PostCreatedEvent;
        eventResult.idCampaign = parseInt(eventResult.idCampaign.toString());
        eventResult.idPost = parseInt(eventResult.idPost.toString());
        return eventResult;
    } catch (error) {
        console.log("Error getting transaction receipt : ", error);
        return null;
    }
}
