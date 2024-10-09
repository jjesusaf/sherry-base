"use client";
import { BASE_SEPOLIA_CHAIN_ID, contracts } from "@/src/constants";
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

export default function JoinCampaignWrapper({
  address,
  idCampaign,
}: {
  address: string;
  idCampaign: number;
}) {
  const handleError = (e: TransactionError) => {
    console.log("hubo un error");
    console.log(e);
  };

  const handleSuccess = (e: TransactionResponse) => {
    console.log("funciono");
    console.log(e);
  };

  const kol = contracts["KolContract"];
  const kolAddress = kol.address.replace(/^0x/, "");

  const campaignConfig = [
    {
      address: `0x${kolAddress}`,
      functionName: "addKolToCampaign",
      abi: kol.abi,
      args: [idCampaign, address],
    },
  ] as unknown as ContractFunctionParameters[];

  return (
    <div className="flex w-[450px]">
      <Transaction
        contracts={campaignConfig}
        className="w-[450px]"
        chainId={BASE_SEPOLIA_CHAIN_ID}
        onError={(e) => handleError(e)}
        onSuccess={(r) => handleSuccess(r)}
      >
        <TransactionButton
          className="mt-0 mr-auto ml-auto w-[450px] max-w-full text-[white]"
          text="Join Campaign"
        />
        <TransactionStatus>
          <TransactionStatusLabel />
          <TransactionStatusAction />
        </TransactionStatus>
      </Transaction>
    </div>
  );
}
