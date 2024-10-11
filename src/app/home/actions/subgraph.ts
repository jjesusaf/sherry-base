"use server"
const ENDPOINT_THE_GRAPH = process.env.ENDPOINT_THE_GRAPH as string;

export async function subGraphKolCampaignsByAddress(address: string) {
    try {
      const response = await fetch(ENDPOINT_THE_GRAPH, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          query GetBrandCreateds {
            kolCampaignAddeds(where: {kol: "${address}"}) {
                idCampaign
                idKolCampaign
                kol
            }
          }
          `,
          operationName: "GetBrandCreateds",
          variables: {},
        }),
      });
      return response.json();
    } catch (error: any) {
      throw new Error(error);
    }
  }