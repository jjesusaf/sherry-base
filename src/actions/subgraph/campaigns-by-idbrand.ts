"use server";

const ENDPOINT_THE_GRAPH = process.env.ENDPOINT_THE_GRAPH as string;

export async function campaignsByIdBrand(idBrand: string) {
  try {
    const response = await fetch(ENDPOINT_THE_GRAPH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          {
             campaignCreateds(where: {idBrand: "${idBrand}"}) {
              endDate
              idBrand
              idCampaign
              name
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
