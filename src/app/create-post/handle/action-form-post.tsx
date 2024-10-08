"use client";
import React from "react";
import FormPost from "../components/form-post";
import { createLink } from "../actions/link";   


const handleSubmit = (data: any) => {
  console.log("Form Data:", data);
};

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

  const url = "http://localhost:3000/challengers";

  const handleLink = async () => {
    const link = await createLink(url);
    console.log("Link creado:", link);
  };

  return (
    <FormPost
      descriptionPlaceholder="Enter a description..."
      onSubmit={handleSubmit}
      shareOptions={shareOptions}
      contentTypeOptions={contentTypeOptions}
      onLink={handleLink}
    />
  );
};

export default ActionFormPost;
