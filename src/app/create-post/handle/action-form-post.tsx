"use client";
import React, { useContext } from "react";
import FormPost from "../components/form-post";
import { createLink, updateLink } from "../actions/link";
import { Post } from "@/src/interface/post";
import { CampaignCoverContext } from "../context/CampaignCoverContext";
import { createPost } from "@/src/service/pinata/upload";
import { useAppContext } from "@/src/context/GlobalContext";
import { useWriteContract } from "wagmi";
import { Contract, getSherryContract } from "@/src/constants";
import { getTransactionEvents } from "../actions/events";
import { useToast } from "@/src/hooks/use-toast";
import { ToastAction } from "@/src/components/ui/toast";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";

const ActionFormPost = () => {
  //const [idKolCampaign, setIdKolCampaign] = React.useState<number>(0);
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

  const sendTx = async (urlMetadata: string) => {
    const tx = await createPostContract({
      abi: sherry.abi,
      address: `0x${sherryAddress}`,
      functionName: "createPost",
      args: [idKolCampaign, urlMetadata],
    });
    return tx;
  };

  const { setLoading, idCampaign, idKolCampaign, isLoading } = useAppContext();

  const url = process.env.NEXT_PUBLIC_APP_URL as string;

  const { campaignCoverFile, campaignCover, clearCampaignCover } =
    useContext(CampaignCoverContext);

  const handleLink = async () => {
    const link = await createLink(url);
  };

  const handleSubmit = async (data: any) => {
    if (!idKolCampaign) throw new Error("No idKolCampaign available");

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
      const post: Post = {
        name: data.share,
        description: data.description,
        external_url: link.id,
        attributes: [{ contentType: data.contentType, share: data.share }],
        file: campaignCoverFile,
      };
      // Sube a IPFS Imagen y Metadata
      const hashMetadata = await createPost(post);

      const txHashPost = await sendTx(hashMetadata);
      const event = await getTransactionEvents(txHashPost);
      if (!event) {
        throw new Error("Error getting transaction events");
      }

      const updated = await updateLink(link.id, `${url}/${event.idPost}`);

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
      {idKolCampaign  ? (
        <FormPost
          descriptionPlaceholder="Enter a description..."
          onSubmit={handleSubmit}
          shareOptions={shareOptions}
          contentTypeOptions={contentTypeOptions}
          onLink={handleLink}
          onClear={handleClear}
        />
      ) : (
        <>
          <div>You must subscribed to this Campaign</div>
          <Button
            className="w-full my-2 bg-crimson11"
            onClick={() => {
              router.push(`/home/`);
            }}
          >
            Subscribe!
          </Button>
        </>
      )}
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
