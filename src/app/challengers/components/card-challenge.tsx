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

interface Kol {
  id_kol: number;
  name: string;
  username: string;
  avatar: string;
}

interface Challenge {
  id_challenge: number;
  id_post: string;
  title: string;
  description: string;
  image: string;
  external_url?: string;
  kol: Kol;
  hasVoted?: boolean;
  hasVotedCampaign?: boolean;
  campaignName?: string;
  brandName?: string;
}

interface CardChallengeProps {
  challenges: Challenge[];
  handleNav?: () => void;
}

const CardChallenge: React.FC<CardChallengeProps> = ({ challenges = [] }) => {
  const { toast } = useToast();
  const { address } = useAccount();
  const [open, setOpen] = React.useState(false);
  const sherry: Contract = getSherryContract();
  const sherryAddress = sherry.address.replace(/^0x/, "");

  const { writeContractAsync: vote, isPending, isSuccess } = useWriteContract();

  /*
  const result = useReadContract({
      abi: sherry.abi,
      address: `0x${sherry.address}`,
      functionName: ""
  })
  */

  const sendVoteTx = async (idPost: number) => {
    const tx = await vote({
      abi: sherry.abi,
      address: `0x${sherryAddress}`,
      functionName: "vote",
      args: [idPost, address],
    });
  };

  const handleShare = async (external_url: string) => {
    try {
      const linkData = await getLink(external_url); // Llama a la función getLink
      console.log("Datos del enlace:", linkData); // Muestra los datos para depuración

      // Busca el objeto en el array cuyo `url` o `id` coincida con el `external_url`
      const matchingLink = linkData.find(
        (link: any) => link.id === external_url
      );

      if (matchingLink && matchingLink.shortLink) {
        // Abre el shortLink en una nueva ventana
        await navigator.clipboard.writeText(matchingLink.shortLink);
        console.log("Link copiado al portapapeles:", matchingLink.shortLink);
        toast({
          variant: "default",
          title: "Link copied to clipboard",
          className: "bg-green-500 border-green-500",
          description: "Share the link with your friends.",
          action: <ToastAction altText="Ok">Ok</ToastAction>,
        });
        return;
      } else {
        console.error(
          "No se encontró un enlace que coincida con el external_url."
        );
        toast({
          variant: "destructive",
          title: "No link found",
          description: "This post is not available link.",
          action: <ToastAction altText="Ok">Ok</ToastAction>,
        });
      }
    } catch (error) {
      console.error("Error al obtener el enlace para compartir:", error);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-[30px]">
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
                  <Image
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
                        <Button className="bg-crimson11" disabled={true}>Already Voted</Button>
                      ) : (
                        <ButtonChain
                          className="bg-crimson11"
                          textIfTrue="Vote"
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
                          onClick={() => sendVoteTx(challenge.id_challenge)}
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
        <p>No challenges available</p>
      )}
    </div>
  );
};

export default CardChallenge;
