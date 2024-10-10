"use server";

export async function postDetail(idPost: string) {
  const response = await fetch(
    "https://api.studio.thegraph.com/query/91138/sherry-posts/version/latest",
    {
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
