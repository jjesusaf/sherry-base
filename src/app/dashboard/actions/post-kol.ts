"use server";

export async function postsKol(address: string) {
  try {
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
              postCreateds(first: 10, where: {kol: "${address}"}) {
                id
                idCampaign
                idPost
                kol
                url
                transactionHash
              }
            }
          `,
          operationName: "Subgraphs",
          variables: {},
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching posts: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(`GraphQL error: ${data.errors.map((error: any) => error.message).join(", ")}`);
    }

    return data.data.postCreateds;
  } catch (error) {
    console.error("Error fetching posts for KOL:", error);
    throw error;
  }
}

/*
  Metricas:
  - Posts: postsByUser cand Campaign
  - Views: FROM DUB CO
  - Votes: votesByCampaign and Post (Obtener los posts que vienen de arriba
  y luego los votos por post)
 */


