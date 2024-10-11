"use client";
import React, { useEffect, useState } from "react";
import CardCampaigns from "../componentes/card-campaigns";
import { subGraphCampaigns } from "../../create-post/actions/link";
import { Campaign, MetadataCampaign } from "@/src/interface/Campaign";
import { fetchMetadataFromIPFS } from "../../challengers/actions/ipfs";
import { useAccount } from "wagmi";
import { subGraphKolCampaignsByAddress } from "../actions/subgraph";

const ActionCardCampaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { address } = useAccount();

  const fetchMetadataCampaigns = async (campaigns: Campaign[]) => {
    console.log("address : ", address);
    // Si el address no existe, el usuario no está conectado
    // por lo que no se puede obtener las campañas suscritas
    const result = address ? await subGraphKolCampaignsByAddress(address) : null;

    //console.log("Campañas suscritas:", result.data.kolCampaignAddeds);
    const kolCampaign = address ? result.data.kolCampaignAddeds : [];

    const updatedCampaigns = await Promise.all(
      campaigns.map(async (c) => {
        const metadataResponse = await fetchMetadataFromIPFS(c.uri);
        return {
          ...c,
          metadata: metadataResponse,
          subscribed: kolCampaign.length > 0 ? (
            kolCampaign.some((k: any) => k.id_campaign === c.idCampaign)
          ) : false
        };
      })
    );

    console.log("Campañas con metadata:", updatedCampaigns);
    setCampaigns(updatedCampaigns);
    setLoading(false);
  };

  const handleSubGraph = async () => {
    try {
      const response = await subGraphCampaigns();
      console.log("Campañas:", response.data.campaignCreateds);
      const fetchedCampaigns = response.data.campaignCreateds;
      await fetchMetadataCampaigns(fetchedCampaigns);
    } catch (error) {
      console.error("Error al obtener las campañas", error);
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSubGraph();
  }, [address]);

  if (loading) {
    return <p>Cargando campañas...</p>;
  }

  if (campaigns.length === 0) {
    return <p>No hay campañas</p>;
  }

  return (
    <div>
      {campaigns.map((campaign, key) => (
        <CardCampaigns key={key} campaign={campaign} />
      ))}
    </div>
  );
};

export default ActionCardCampaigns;
