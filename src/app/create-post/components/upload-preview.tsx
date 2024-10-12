import React from "react";
import Image from "next/image";

interface UploadPreviewProps {
  preview: string;
  fileType: string;
  dropImage: () => void;
}

const UploadPreview: React.FC<UploadPreviewProps> = ({
  preview,
  fileType,
  dropImage,
}) => {
  const isImage = fileType.startsWith("image/");
  const isVideo = fileType.startsWith("video/");

  console.log("isImage", isImage);
  console.log("isVideo", isVideo);
  return (
    <div className="relative">
      {isImage && (
        <Image
          src={preview}
          alt="Uploaded preview"
          className="h-48 object-cover"
          width={300}
          height={300}
        />
      )}
      {isVideo && (
        <video
          src={preview}
          className="h-48 object-cover"
          width={300}
          height={300}
          controls
        />
      )}
      <i
        className="ri-close-large-line text-red-500 text-[20px] absolute top-0 right-0 cursor-pointer"
        onClick={dropImage}
      ></i>
    </div>
  );
};

export default UploadPreview;
