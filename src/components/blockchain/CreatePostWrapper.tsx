"use client";
import { BASE_SEPOLIA_CHAIN_ID, Contract, getSherryContract } from "@/src/constants";
import {
  Transaction,
  TransactionButton,
  TransactionError,
  TransactionResponse,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from "@coinbase/onchainkit/transaction";
import type { Address, ContractFunctionParameters } from "viem";

export default function CreatePostWrapper({ address }: { address: Address }) {
  const handleError = (e: TransactionError) => {
    console.log("hubo un error");
    console.log(e);
  };

  const handleSuccess = (e: TransactionResponse) => {
    console.log("funciono");
    console.log(e);
  };

  const sherry: Contract = getSherryContract();
  const sherryAddress = (sherry.address).replace(/^0x/, "")

  const checkConfig = [
    {
      address: `0x${sherryAddress}`,
      functionName: "createPost",
      abi: sherry.abi,
      args: [1, ""],
    },
  ] as unknown as ContractFunctionParameters[];

  return (
    <div className="flex w-[450px]">
      <Transaction
        contracts={checkConfig}
        className="w-[450px]"
        chainId={BASE_SEPOLIA_CHAIN_ID}
        onStatus={(e) => console.log("status : ", e)}
        onError={(e) => handleError(e)}
        onSuccess={(r) => handleSuccess(r)}
      >
        <TransactionButton
          className="mt-0 mr-auto ml-auto w-[450px] max-w-full text-[white]"
          text="Create Post"
        />
        <TransactionStatus>
          <TransactionStatusLabel />
          <TransactionStatusAction />
        </TransactionStatus>
      </Transaction>
    </div>
  );
}
