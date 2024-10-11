"use server";

const ENDPOINT_THE_GRAPH = "https://api.studio.thegraph.com/query/91138/sherry-posts/version/latest"

export async function createLink(url: string) {
  try {
    const DUB_API_KEY = process.env.NEXT_PUBLIC_DUB_API_KEY;
    const response = await fetch("https://api.dub.co/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DUB_API_KEY}`,
      },
      body: JSON.stringify({
        url: url,
      }),
    });
    const data = await response.json();
    console.log("Link creado:", data);
    return data;
  } catch (error) {
    console.error("Error creando el enlace con Dub:", error);
    throw error;
  }
}

export async function updateLink(id: string, url: string) {
  try {
    const DUB_API_KEY = process.env.NEXT_PUBLIC_DUB_API_KEY;
    const response = await fetch(`https://api.dub.co/links/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DUB_API_KEY}`,
      },
      body: JSON.stringify({
        url: url,
      }),
    });
    const data = await response.json();
    console.log("Link actualizado:", data);
    return data;
  } catch (error) {
    console.error("Error actualizando el enlace con Dub:", error);
    throw error;
  }
}

export async function subGraphPostCreateds() {
  try {
    const response = await fetch(
      ENDPOINT_THE_GRAPH,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
       {
          postCreateds {
            id
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
    return response.json();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function subGraphVotes() {
  try {
    const response = await fetch(ENDPOINT_THE_GRAPH,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: `{
                    voteds {
                      idPost
                      voter
                  }
                }  
                `,
          operationName: "Subgraphs",
          variables: {}
        })
      }
    )

    return response.json();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function subGraphCampaigns() {
  try {
    const response = await fetch(
      ENDPOINT_THE_GRAPH,
      {
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
            }
          }
          `,
          operationName: "Subgraphs",
          variables: {},
        }),
      }
    );
    return response.json();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function subGraphBrandCreateds() {
  try {
    const response = await fetch(ENDPOINT_THE_GRAPH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        query GetBrandCreateds {
          brandCreateds {
            idBrand
            brandOwner
            name
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

export async function mergeSubGraphDataByAddress(address: string) {
  try {
    const postCreatedsResponse = await subGraphPostCreateds();
    const votesResponse = await subGraphVotes();
    const campaignsResponse = await subGraphCampaigns();
    const brandsResponse = await subGraphBrandCreateds();

    const postCreateds = postCreatedsResponse.data.postCreateds;
    const voteds = votesResponse.data.voteds;
    const campaigns = campaignsResponse.data.campaignCreateds;
    const brands = brandsResponse.data.brandCreateds;


    // Convertir la dirección del votante a mayúsculas
    const upperCaseAddress = address.toUpperCase();

    // Filtrar los votos por la dirección del votante en mayúsculas
    const votedsByAddress = voteds.filter((vote: any) => {
      return vote.voter.toUpperCase() === upperCaseAddress;
    });

    // Combinar los resultados
    const combinedData = postCreateds.map((post: any) => {
      const hasVoted = votedsByAddress.some((vote: any) => vote.idPost === post.idPost);
      const hasVotedCampaign = votedsByAddress.some((vote: any) => {
        const votedPost = postCreateds.find((p: any) => p.idPost === vote.idPost);
        return votedPost && votedPost.idCampaign === post.idCampaign;
      });
      const campaign = campaigns.find((c: any) => c.idCampaign === post.idCampaign);
      const brand = brands.find((b: any) => b.idBrand === campaign.idBrand);
      return {
        ...post,
        hasVoted,
        hasVotedCampaign,
        campaignName: campaign ? campaign.name : null,
        brandName: brand ? brand.name : null,
      };
    });
    console.log(combinedData)
    return { data: { postCreateds: combinedData } };
  } catch (error: any) {
    throw new Error(error);
  }
}

