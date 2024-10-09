"use client";
import React, { useContext } from "react";
import FormPost from "../components/form-post";
import { createLink } from "../actions/link";
import { Post } from "@/src/interface/post";
import { CampaignCoverContext } from "../context/CampaignCoverContext";
import { createPost } from "@/src/service/pinata/upload";
import { useLoading } from "@/src/context/LoadingContext";
import { ToastAction } from "@/src/components/ui/toast";
import { useToast } from "@/src/hooks/use-toast";


const ActionFormPost = () => {
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
  const { setLoading } = useLoading();
  const { toast } = useToast();
  const url = "http://localhost:3000/challengers";

  const { campaignCoverFile, campaignCover,clearCampaignCover } = useContext(CampaignCoverContext);
  const handleLink = async () => {
    const link = await createLink(url);
    console.log("Link creado:", link);
  };

  const handleSubmit = async (data: any) => {
    try {
      setLoading(true);
      console.log(data);
      console.log(campaignCover);
      if (!campaignCoverFile) {
        console.error("No campaign cover file available");
        toast({
          variant: "destructive",
          title: "Falta archivo",
          description: "No se ha proporcionado un archivo de campaña.",
          action: <ToastAction altText="Ok">Ok</ToastAction>,
        });
        return;
      }

      //const link = await createLink(url);
      const post: Post = {
        name: data.share,
        description: data.description,
        external_url: "https://example.com",
        attributes: [{ contentType: data.contentType, share: data.share }],
        file: campaignCoverFile,
      };
      const ipfs = await createPost(post);
      console.log("IPFS:", ipfs);
      console.log("Mapped Post Data:", post);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormPost
      descriptionPlaceholder="Enter a description..."
      onSubmit={handleSubmit}
      shareOptions={shareOptions}
      contentTypeOptions={contentTypeOptions}
      onLink={handleLink}
      onClear={clearCampaignCover}
    />
  );
};

export default ActionFormPost;
