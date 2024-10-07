import { useReadContract } from "wagmi";
import { contracts } from "../constants";

export function ReadBrand() {
  const {
    data: info,
    isError,
    isPending,
  } = useReadContract({
    functionName: "getCampaignById",
    args: [1],
    abi: contracts["CampaignContract"].abi,
    address: `0x${contracts["CampaignContract"].address}`,
  });

  console.log("info : ", info)

  return (
    <div>
      <p>Is Pending {isPending ? "Pendiente" : "No pendiente"}</p>
      <p>IsError {isError ? "Hay error" : "No hay error"}</p>
      <p>Resultado {info ? info.toString() : "No data"}</p>
    </div>
  );
}
