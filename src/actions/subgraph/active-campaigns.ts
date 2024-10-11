"use server";
import { fetchMetadataFromIPFS } from "../../app/challengers/actions/ipfs";

const ENDPOINT_THE_GRAPH = process.env.ENDPOINT_THE_GRAPH as string;

export async function subGraphCampaignsActive() {
  try {
    const response = await fetch(ENDPOINT_THE_GRAPH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        {
          campaignCreateds {
            idBrand
            idCampaign
            name
            uri,
            startDate,
            endDate
          }
        }
        `,
        operationName: "Subgraphs",
        variables: {},
      }),
    });

    const data = await response.json();
    return data.data.campaignCreateds;
  } catch (error: any) {
    throw new Error(error);
  }
}

async function fetchMetadataCampaigns(campaigns: any[]) {
  const updatedCampaigns = await Promise.all(
    campaigns.map(async (campaign) => {
      const metadataResponse = await fetchMetadataFromIPFS(campaign.uri);
      return {
        ...campaign,
        metadata: metadataResponse,
      };
    })
  );
  return updatedCampaigns;
}

function filterActiveCampaigns(campaigns: any[]) {
  const today = Math.floor(Date.now() / 1000);
  return campaigns.filter((campaign) => {
    const endDate = parseInt(campaign.metadata.end_date);
    return endDate > today;
  });
}

export async function getActiveCampaigns() {
  try {
    const campaigns = await subGraphCampaignsActive();

    const campaignsWithMetadata = await fetchMetadataCampaigns(campaigns);

    const activeCampaigns = filterActiveCampaigns(campaignsWithMetadata);

    return activeCampaigns;
  } catch (error: any) {
    console.error("Error al obtener campañas activas", error);
    throw new Error(error);
  }
}
