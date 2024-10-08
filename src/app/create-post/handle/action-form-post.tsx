"use client";
import React from "react";
import FormPost from "../components/form-post";

// Opciones vacías (o no pasar las props en absoluto)
const handleSubmit = (data: any) => {
  console.log("Form Data:", data);
};

const ActionFormPost = () => {

    // Opciones para Share Options
const shareOptions: { value: string; label: string }[] = [
    { value: "instagram", label: "Instagram" },
    { value: "facebook", label: "Facebook" },
    { value: "tiktok", label: "TikTok" },
    { value: "youtube", label: "YouTube" },
    { value: "x", label: "X" }, // Anteriormente conocido como Twitter
  ];
  
  // Opciones para Content Type Options
  const contentTypeOptions: { value: string; label: string }[] = [
    { value: "reel", label: "Reel" },
    { value: "story", label: "Story" },
    { value: "short", label: "Short" },
    { value: "video", label: "Video" },
    { value: "direct_message", label: "Direct Message" },
  ];
  

  return (
    <FormPost
      descriptionPlaceholder="Enter a description..."
      onSubmit={handleSubmit}
      shareOptions={shareOptions}
      contentTypeOptions={contentTypeOptions}
      // Puedes omitir shareOptions y contentTypeOptions si no son necesarias
    />
  );
};

export default ActionFormPost;
