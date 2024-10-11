"use client";
import * as React from "react";
import { useAppContext } from "@/src/context/GlobalContext"; // Importar el contexto global
import {
  CaretSortIcon,
  CheckIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "src/components/ui/avatar";
import { Button } from "src/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "src/components/ui/command";
import { Dialog } from "src/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "src/components/ui/popover";

import { getActiveCampaigns } from "@/src/actions/subgraph/active-campaigns"; 

type Campaign = {
  idCampaign: string;
  name: string;
};

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {}

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
  const [campaigns, setCampaigns] = React.useState<Campaign[]>([]);
  const [selectedTeam, setSelectedTeam] = React.useState<Campaign | null>(null);

  const { setIdCampaign, idCampaign } = useAppContext(); 

  React.useEffect(() => {
    async function fetchCampaigns() {
      try {
        const activeCampaigns = await getActiveCampaigns(); 
        setCampaigns(activeCampaigns);
        const initialSelectedTeam = idCampaign
          ? activeCampaigns.find(campaign => campaign.idCampaign === idCampaign) 
          : activeCampaigns[0]; 

        setSelectedTeam(initialSelectedTeam || null);

        if (!idCampaign && initialSelectedTeam) {
          setIdCampaign(initialSelectedTeam.idCampaign);
        }
      } catch (error) {
        console.error("Error fetching campaigns: ", error);
      }
    }
    fetchCampaigns();
  }, [idCampaign, setIdCampaign]);

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-auto justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarFallback className="text-black">
                {selectedTeam ? selectedTeam.idCampaign : "SC"}
              </AvatarFallback>
            </Avatar>
            {selectedTeam ? selectedTeam.name : "Select a campaign"}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-2 gap-2">
          <Command>
            <CommandList>
              <CommandEmpty>No campaigns found.</CommandEmpty>
              <CommandGroup heading="Campaigns">
                {campaigns.map((campaign) => (
                  <CommandItem
                    key={campaign.idCampaign}
                    onSelect={() => {
                      setSelectedTeam(campaign);
                      setIdCampaign(campaign.idCampaign);
                      setOpen(false);
                    }}
                    className="text-sm"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarFallback>{campaign.idCampaign}</AvatarFallback>
                    </Avatar>
                    {campaign.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedTeam?.idCampaign === campaign.idCampaign
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </Dialog>
  );
}
