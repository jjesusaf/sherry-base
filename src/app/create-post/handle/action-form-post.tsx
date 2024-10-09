"use client";
import React, { useContext } from "react";
import FormPost from "../components/form-post";
import { createLink, updateLink } from "../actions/link";
import { Post } from "@/src/interface/post";
import { CampaignCoverContext } from "../context/CampaignCoverContext";
import { createPost } from "@/src/service/pinata/upload";
import { useLoading } from "@/src/context/LoadingContext";
import { useWriteContract } from "wagmi";
import { Contract, getSherryContract } from "@/src/constants";
import { getTransactionEvents } from "../actions/events";

const DEFAULT_ID_KOL_CAMPAIGN = 1;

const ActionFormPost = () => {
  const sherry: Contract = getSherryContract();
  const sherryAddress = sherry.address.replace(/^0x/, "");
  
  const {
    writeContractAsync: createPostContract,
    isPending,
    isSuccess,
    isError,
  } = useWriteContract();

  const sendTx = async (idKolCampaign: number = 1, urlMetadata: string) => {
    const tx = await createPostContract({
      abi: sherry.abi,
      address: `0x${sherryAddress}`,
      functionName: "createPost",
      args: [
        idKolCampaign, // Este ID solo funciona para 1 address, es el IdKolCampaign
        // Un KOL debe unirse a una campaña para poder obtener su propia ID
        // y crear un post
        urlMetadata,
      ],
    });
    return tx;
  };

  const { setLoading } = useLoading();

  const url = "http://localhost:3000/challengers";

  const { campaignCoverFile, campaignCover, clearCampaignCover } = useContext(CampaignCoverContext);

  const handleLink = async () => {
    const link = await createLink(url);
  };

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true);
      if (!campaignCoverFile) {
        console.error("No campaign cover file available");
        return;
      }

      // Crea Link dub.co
      const link = await createLink(url);
      console.log("Link creado:", link);
      console.log("Link URL:", link.url);
      const post: Post = {
        name: data.share,
        description: data.description,
        external_url: link.url,
        attributes: [{ contentType: data.contentType }],
        file: campaignCoverFile,
      };
      // Sube a IPFS Imagen y Metadata
      const hashMetadata = await createPost(post);
      //console.log("hashMetadata:", hashMetadata);
      const txHashPost = await sendTx(1, hashMetadata);
      const event = await getTransactionEvents(txHashPost);
      if (!event) {
        throw new Error("Error getting transaction events");
      }

      const updated = await updateLink(link.id, `${url}/${event.idPost}`);
      console.log("Link actualizado:", updated);
      return true;
    } catch (error) {
      console.error("Error creating post:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    clearCampaignCover();
  };

  return (
    <>
      <FormPost
        descriptionPlaceholder="Enter a description..."
        onSubmit={handleSubmit}
        shareOptions={shareOptions}
        contentTypeOptions={contentTypeOptions}
        onLink={handleLink}
        onClear={handleClear}
      />
      {isError ? (
        <div className="text-red-500">Error en la transacción</div>
      ) : null}
      {isSuccess ? (
        <div className="text-green-500">Transacción exitosa</div>
      ) : null}
    </>
  );
};

export default ActionFormPost;

const shareOptions: { value: string; label: string }[] = [
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
  { value: "x", label: "X" },
];

const contentTypeOptions: { value: string; label: string }[] = [
  { value: "reel", label: "Reel" },
  { value: "story", label: "Story" },
  { value: "short", label: "Short" },
  { value: "video", label: "Video" },
  { value: "direct_message", label: "Direct Message" },
];
