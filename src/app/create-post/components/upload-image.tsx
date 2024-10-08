import React, { useState, useEffect, useContext } from "react";
import { Label } from "src/components/ui/label";
import { Input } from "src/components/ui/input";
import { Button } from "src/components/ui/button";
import { CardContent } from "src/components/ui/card";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { CampaignCoverContext } from "../context/CampaignCoverContext";

interface CampaignCoverForm {
    campaignCover: File | null;
  }
const UploadImage: React.FC = () => {
    const { register, setValue } = useForm<CampaignCoverForm>();
    const [preview, setPreview] = useState<string | null>(null);
  
    const { campaignCover, setCampaignCover, clearCampaignCover } =
      useContext(CampaignCoverContext);
    // Manejo de cambio de archivo
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      const file = files?.[0] || null;
      if (file) {
        if (file.size > 10000000) {
          // 10MB
          alert("El tamaño de la imagen debe ser menor a 10MB.");
          return;
        }
        if (!["image/jpeg", "image/png"].includes(file.type)) {
          alert("Solo se permiten imágenes en formato JPG o PNG.");
          return;
        }
        setPreview(URL.createObjectURL(file));
        setCampaignCover(file);
      }
    };
  
    const dropImage = () => {
      setPreview(null);
      setValue("campaignCover", null);
      clearCampaignCover();
    };
  
    useEffect(() => {
      if (campaignCover) {
        setPreview(campaignCover);
      } else {
        setPreview(null);
      }
    }, [campaignCover]);
  
    return (
     <form>
       <CardContent className="p-0">
        {/* Contenedor para subir imagen */}
        <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center">
          <input
            type="file"
            id="campaignCover"
            accept="image/jpeg, image/png"
            {...register("campaignCover")}
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Mostrar vista previa de la imagen */}
          <label htmlFor="campaignCover" className="cursor-pointer">
            {preview ? (
              <div className="relative">
                <Image
                  src={preview}
                  alt="Uploaded preview"
                  className="h-48 object-cover"
                  width={300}
                  height={300}
                />
                <i
                  className="ri-close-large-line text-red-500 text-[20px] absolute top-0 right-0 cursor-pointer"
                  onClick={dropImage}
                ></i>
              </div>
            ) : (
              <div className="text-gray-500">
                <p>Drop your image, or</p>
                <p className="underline">Click to browse</p>
              </div>
            )}
          </label>
        </div>
      </CardContent>
     </form>
    )
}

export default UploadImage;