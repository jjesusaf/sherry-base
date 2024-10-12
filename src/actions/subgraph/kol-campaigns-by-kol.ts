"use server"

const ENDPOINT_THE_GRAPH = process.env.ENDPOINT_THE_GRAPH as string;

export async function subGraphKolCampaignsByAddress(address: string, idCampaign: string) {
    try {
        const response = await fetch(ENDPOINT_THE_GRAPH, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `
            {
                kolCampaignAddeds(where: {kol: "${address}", idCampaign: "${idCampaign}"}) {
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