import React, { useState, useEffect } from "react";
import Image from "next/image";

interface MediaPreviewProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const MediaPreview: React.FC<MediaPreviewProps> = ({
  src,
  alt,
  width,
  height,
  className,
}) => {
  const [fileType, setFileType] = useState<string | null>(null);

  useEffect(() => {
    const fetchFileType = async () => {
      try {
        const response = await fetch(src, { method: "HEAD" });
        const contentType = response.headers.get("Content-Type");
        setFileType(contentType);
      } catch (error) {
        console.error("Error fetching file type:", error);
      }
    };

    fetchFileType();
  }, [src]);

  const isImage = fileType?.startsWith("image/");
  const isVideo = fileType?.startsWith("video/");

  return (
    <div className="relative">
      {isImage && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
        />
      )}
      {isVideo && (
        <video
          autoPlay
          muted
          playsInline
          loop
          src={src}
          width={width}
          height={height}
          className={className}
          
        />
      )}
      {!fileType && <p>Loading...</p>}
    </div>
  );
};

export default MediaPreview;
