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
import { uploadMetadataToPinata } from "@/src/service/pinata/upload";
import { useToast } from "@/src/hooks/use-toast";
import { ToastAction } from "@/src/components/ui/toast";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

const DEFAULT_ID_KOL_CAMPAIGN = 1;

const ActionFormPost = () => {
  const router = useRouter();
  const sherry: Contract = getSherryContract();
  const sherryAddress = sherry.address.replace(/^0x/, "");

  const { toast } = useToast();

  const { address } = useAccount();

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

  const { campaignCoverFile, campaignCover, clearCampaignCover } =
    useContext(CampaignCoverContext);

  const handleLink = async () => {
    const link = await createLink(url);
  };

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true);
      if (!campaignCoverFile) {
        console.error("No campaign cover file available");
        toast({
          variant: "destructive",
          title: "Upload a cover image",
          description: "Please upload a cover image to create a post.",
          className: "bg-yellow-500 border-yellow-500",
          action: <ToastAction altText="Ok">Ok</ToastAction>,
        });
        return;
      }

      // Crea Link dub.co
      const link = await createLink(url);
      console.log("Link creado:", link);
      console.log("Link URL:", link.url);
      const post: Post = {
        name: data.share,
        description: data.description,
        external_url: link.id,
        attributes: [{ contentType: data.contentType, share: data.share }],
        file: campaignCoverFile,
      };
      // Sube a IPFS Imagen y Metadata
      const hashMetadata = await createPost(post);
      //console.log("hashMetadata:", hashMetadata);
      const txHashPost = await sendTx(2, hashMetadata);
      const event = await getTransactionEvents(txHashPost);
      if (!event) {
        throw new Error("Error getting transaction events");
      }

      const updated = await updateLink(link.id, `${url}/${event.idPost}`);
      console.log("Link actualizado:", updated);
      clearCampaignCover();
      router.push(`/challengers/${event.idPost}`);
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
