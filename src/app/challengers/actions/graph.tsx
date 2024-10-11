"use server";
const ENDPOINT_THE_GRAPH = process.env.ENDPOINT_THE_GRAPH as string;


export async function postDetail(idPost: string) {
  const response = await fetch(ENDPOINT_THE_GRAPH, {
    method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
   {
  postCreateds(where: {idPost: "${idPost}"}) {
    idCampaign
    idPost
    kol
    url
  }
}
      `,
        operationName: "Subgraphs",
        variables: {},
      }),
    }
  );
  try {
  } catch (error) {
    throw error;
  }

  const data = await response.json();

  return data;
}
