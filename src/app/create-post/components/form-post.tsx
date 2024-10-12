"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UploadImage from "./upload-image";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Textarea } from "@/src/components/ui/textarea";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { ButtonChain } from "@/src/components/ButtonChain";
import { useAppContext } from "@/src/context/GlobalContext";
import { subGraphKolCampaignsByAddress } from "@/src/actions/subgraph/kol-campaigns-by-kol";
import { useAccount } from "wagmi";

// Define las interfaces para los selects y los campos del formulario
interface SelectOption {
  value: string;
  label: string;
}

interface FormPostProps {
  shareOptions?: SelectOption[]; // Opcional con "?" por si no se pasa
  contentTypeOptions?: SelectOption[]; // Opcional con "?" por si no se pasa
  descriptionPlaceholder: string;
  onSubmit: (data: FormData) => void;
  onLink: () => void;
  onClear: () => void;
  setIdKolCampaign: React.Dispatch<React.SetStateAction<number>>;
}

// Define el esquema de validación con Zod
const formSchema = z.object({
  description: z
    .string()
    .min(5, "Description must be at least 5 characters long"),
  share: z.string().nonempty("Please select a platform to share the post"),
  contentType: z.string().nonempty("Please select a content type"),
});

type FormData = z.infer<typeof formSchema>;

const FormPost: React.FC<FormPostProps> = ({
  shareOptions = [],
  contentTypeOptions = [],
  descriptionPlaceholder,
  onSubmit,
  onLink,
  onClear,
  setIdKolCampaign
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,

  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      share: "",
      contentType: "",
    },
  });

  const { idCampaign, isLoading } = useAppContext();
  const { address } = useAccount();
  const [isLoadingSubGraph, setIsLoadingSubGraph] = React.useState(true);

  if (isLoading && !address) return <div>Loading...</div>;

  const handleSubGraph = async () => {
    if (address === undefined) return;
    if (!idCampaign) return;


    const { data } = await subGraphKolCampaignsByAddress(address!, idCampaign!);
    const campaignByKol = data.kolCampaignAddeds;

    if(campaignByKol.length === 0) { 
      setIsLoadingSubGraph(false);
      // No hay campañas
      return 
    }

    const idKolCampaign = campaignByKol.find((c: any) => {
      return c.idCampaign === idCampaign;
    });


    setIdKolCampaign(idKolCampaign?.idKolCampaign);
    setIsLoadingSubGraph(false);
  };

  React.useEffect(() => {
    handleSubGraph();
  }, [idCampaign, address]);

  return (
    <div className="flex flex-col gap-[1rem]">
      <Card className="w-full max-w-[350px] p-[24px] gap-[1rem] flex flex-col">
        <CardHeader>
          <CardTitle>Upload content</CardTitle>
          <CardDescription>
            Lipsum dolor sit amet, consectetur adipiscing elit
          </CardDescription>
        </CardHeader>
        <UploadImage />
        <CardContent className="p-0">
          <form onSubmit={handleSubmit(onSubmit)} className="p-0">
            <div className="grid w-full items-center gap-4 p-0">
              {/* Description Field */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder={descriptionPlaceholder}
                  {...register("description")}
                />
                {errors.description && (
                  <span className="text-red-500">
                    {errors.description.message}
                  </span>
                )}
              </div>

              {/* Share Post On Select */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="share">Share post on</Label>
                {shareOptions.length > 0 ? (
                  <Select onValueChange={(value) => setValue("share", value)}>
                    <SelectTrigger id="share">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {shareOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <span className="text-gray-500">
                    No options available for sharing
                  </span>
                )}
                {errors.share && (
                  <span className="text-red-500">{errors.share.message}</span>
                )}
              </div>

              {/* Content Type Select */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="contentType">Content type</Label>
                {contentTypeOptions.length > 0 ? (
                  <Select
                    onValueChange={(value) => setValue("contentType", value)}
                  >
                    <SelectTrigger id="contentType">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {contentTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <span className="text-gray-500">
                    No content type options available
                  </span>
                )}
                {errors.contentType && (
                  <span className="text-red-500">
                    {errors.contentType.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={onClear}>
                Discard
              </Button>
              <ButtonChain
                textIfTrue={isLoadingSubGraph ? "Loading..." : "Create Post"}
                textIfFalse="Sign In"
                className="bg-crimson11"
                type="submit"
                disabled={isLoadingSubGraph}
              />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormPost;
