"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { Share, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "src/components/ui/avatar";
import { useAccount } from "wagmi";
import TransactionWrapper from "src/components/TransactionWrapper";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";
import { getLink } from "../actions/link";
import { useToast } from "@/src/hooks/use-toast";
import { ToastAction } from "@/src/components/ui/toast";
import { ButtonChain } from "@/src/components/ButtonChain";
import { useWriteContract, useReadContract } from "wagmi";
import { Contract, getSherryContract } from "@/src/constants";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Challenge } from "@/src/interface/Challenge";
import MediaPreview from "./media-previa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";

interface CardChallengeProps {
  challenges: Challenge[];
  handleNav?: () => void;
}

const CardChallenge: React.FC<CardChallengeProps> = ({ challenges }) => {
  const { toast } = useToast();
  const { address } = useAccount();
  const sherry: Contract = getSherryContract();
  const sherryAddress = sherry.address.replace(/^0x/, "");
  const [finalChallenges, setFinalChallenges] =
    React.useState<Challenge[]>(challenges); // eslint-disable-line

  const { writeContractAsync: vote, isPending, isSuccess } = useWriteContract();

  const sendVoteTx = async (idPost: number) => {
    if (!address) {
      console.log("NO HAY ADDRESS");
      return;
    }

    await vote({
      abi: sherry.abi,
      address: `0x${sherryAddress}`,
      functionName: "vote",
      args: [idPost, address],
    });
  };

  const fallbackCopyTextToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand("copy");
      if (successful) {
        console.log("Fallback: Copiado exitosamente al portapapeles");
        toast({
          variant: "default",
          title: "Link copied using fallback",
          className: "bg-green-500 border-green-500",
          description: "Share the link with your friends.",
          action: <ToastAction altText="Ok">Ok</ToastAction>,
        });
      } else {
        console.error("Fallback: No se pudo copiar");
        toast({
          variant: "destructive",
          title: "Fallback failed",
          description: "The fallback method failed to copy the link.",
          action: <ToastAction altText="Ok">Ok</ToastAction>,
        });
      }
    } catch (err) {
      console.error("Fallback: Error al copiar", err);
    }
    document.body.removeChild(textArea);
  };

  const handleShare = async (external_url: string) => {
    try {
      const linkData = await getLink(external_url);
      const matchingLink = linkData.find(
        (link: any) => link.id === external_url
      );

      if (matchingLink && matchingLink.shortLink) {
        // Intentamos copiar al portapapeles
        try {
          await navigator.clipboard.writeText(matchingLink.shortLink);
          console.log("Link copiado al portapapeles:", matchingLink.shortLink);
          toast({
            variant: "default",
            title: "Link copied to clipboard",
            className: "bg-green-500 border-green-500",
            description: "Share the link with your friends.",
            action: <ToastAction altText="Ok">Ok</ToastAction>,
          });
        } catch (error) {
          console.warn("Fallo al usar clipboard API, probando API de compartir.");
          // Si la API de Clipboard falla, intentamos usar la API de compartir nativa (móviles)
          if (navigator.share) {
            try {
              await navigator.share({
                title: "Check this out!",
                text: "Here is a cool link:",
                url: matchingLink.shortLink,
              });
              console.log("Link compartido exitosamente.");
              toast({
                variant: "default",
                title: "Link shared successfully",
                description: "You shared the link with others.",
                action: <ToastAction altText="Ok">Ok</ToastAction>,
              });
            } catch (shareError) {
              console.error("Error al compartir el link:", shareError);
              toast({
                variant: "destructive",
                title: "Error sharing link",
                description: `Failed to share the link: ${String(shareError)}`,
                action: <ToastAction altText="Ok">Ok</ToastAction>,
              });
            }
          } else {
            // Si la API de compartir tampoco está disponible, usamos el fallback
            console.warn("API de compartir no disponible, usando fallback.");
            fallbackCopyTextToClipboard(matchingLink.shortLink);
          }
        }
      } else {
        console.error("No se encontró un enlace que coincida con el external_url.");
        toast({
          variant: "destructive",
          title: "No link found",
          description: "This post does not have a valid link.",
          action: <ToastAction altText="Ok">Ok</ToastAction>,
        });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Error al obtener el enlace para compartir:", errorMessage);
      toast({
        variant: "destructive",
        title: "Error fetching link",
        description: `Failed to get the link: ${errorMessage}`,
        action: <ToastAction altText="Ok">Ok</ToastAction>,
      });
    }
  };

  
  return (
    <div className="flex flex-wrap items-center md:justify-start justify-center gap-[30px]">
      {challenges.length > 0 ? (
        challenges.map((challenge) => (
          <div
            key={challenge.id_challenge}
            className="max-w-[352px] w-full flex flex-col gap-3"
          >
            <Card className="border-none bg-transparent shadow-none flex justify-between">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Avatar className="w-[40px] h-[40px] rounded-full border border-border items-center justify-center">
                    <AvatarImage
                      src={challenge.kol.avatar}
                      alt={`@${challenge.kol.username}`}
                      className="w-[24px] h-[24px] rounded-full"
                    />
                    <AvatarFallback>
                      {challenge.kol.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <CardTitle>@{challenge.kol.username}</CardTitle>
                    <CardDescription className="break-all">
                      Posted on {challenge.title}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </Card>
            <Card>
              <Link
                href={`/challengers/${challenge.id_post}`}
                className="w-full"
              >
                <CardContent className="p-0 h-[440px] items-center justify-center flex">
                  <MediaPreview
                    src={challenge.image}
                    alt={challenge.title}
                    width={300}
                    height={200}
                    className="w-full max-h-[440px] h-auto rounded-t-[11px]"
                  />
                </CardContent>
              </Link>

              <CardFooter className="p-[16px] flex flex-col gap-2 w-full">
                <div className="flex justify-between py-[12px] items-center text-[12px] gap-2 text-center">
                  <p className="font-semibold">@{challenge.kol.username}</p>
                  <p>{challenge.description}</p>
                </div>
                <div className="flex w-full justify-between">
                  <Button
                    variant="outline"
                    size="default"
                    className="gap-1.5 text-sm"
                    onClick={() => handleShare(challenge.external_url!)}
                  >
                    <Share className="size-3.5" />
                    Share
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      {challenge.hasVotedCampaign ? (
                        <Button className="bg-crimson11" disabled={true}>
                          Already Voted
                        </Button>
                      ) : (
                        <ButtonChain
                          className="bg-crimson11"
                          textIfTrue="Support"
                          textIfFalse="Log In"
                        />
                      )}
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-[6px] border border-border  shadow-lg p-[24px] w-full max-w-[352px]">
                      <AlertDialogHeader className="items-center">
                        <div className="w-[120px] h-[88px]">
                          <Image
                            src="/images/loving.svg"
                            alt="loving"
                            width={120}
                            height={88}
                            className="w-full"
                          />
                        </div>
                        <AlertDialogTitle>
                          You’ve Chosen Your Champion!
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Once selected, you won’t be able to change your
                          champion, so choose wisely.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="flex flex-row justify-center items-center gap-2">
                        <AlertDialogCancel className="w-full m-0">
                          Cancel
                        </AlertDialogCancel>
                        <ButtonChain
                          className="bg-crimson11 w-full"
                          textIfTrue="Confirm"
                          textIfFalse="Log In"
                          onClick={() =>
                            sendVoteTx(parseInt(challenge.id_post))
                          }
                        />
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardFooter>
            </Card>
          </div>
        ))
      ) : (
        <Skeleton className="w-[352px] h-[440px]" />
      )}
    </div>
  );
};

export default CardChallenge;
