"use server";
import { postDetail } from "../../challengers/actions/graph";

const ENDPOINT_THE_GRAPH = process.env.ENDPOINT_THE_GRAPH as string;

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
              uri,
              startDate,
              endDate
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

export async function mergeSubGraphDataByPost(idPost: string, address: string) {
  try {
    // Consultar el detalle del post específico
    const postCreatedsResponse = await postDetail(idPost);
    const votesResponse = await subGraphVotes();
    const campaignsResponse = await subGraphCampaigns();
    const brandsResponse = await subGraphBrandCreateds();

    // Extraer los datos de las respuestas
    const postCreateds = postCreatedsResponse.data.postCreateds; // Solo 1 post
    const voteds = votesResponse.data.voteds;
    const campaigns = campaignsResponse.data.campaignCreateds;
    const brands = brandsResponse.data.brandCreateds;

    // Convertir la dirección del votante a mayúsculas
    const upperCaseAddress = address.toUpperCase();

    // Filtrar los votos por la dirección del votante
    const votedsByAddress = voteds.filter((vote: any) => vote.voter.toUpperCase() === upperCaseAddress);


    // Tomamos el único post retornado
    const post = postCreateds[0];

    // Calcular si el usuario ha votado en este post específico
    const hasVoted = votedsByAddress.some((vote: any) => vote.idPost === idPost);

    // Calcular si el usuario ha votado en la campaña del post
    const hasVotedCampaign = votedsByAddress.some((vote: any) => {
      // Encontrar el post que corresponde al voto
      const votedPost = postCreateds.find((p: any) => p.idPost === vote.idPost);
      return votedPost && votedPost.idCampaign === post.idCampaign;
    });

    // Encontrar la campaña correspondiente al post
    const campaign = campaigns.find((c: any) => c.idCampaign === post.idCampaign);

    // Encontrar la marca correspondiente a la campaña
    const brand = brands.find((b: any) => b.idBrand === campaign?.idBrand);

    // Combinar los datos
    const combinedData = {
      ...post,
      hasVoted, // Si el usuario ha votado en este post específico
      hasVotedCampaign, // Si el usuario ha votado en la campaña del post
      campaignName: campaign ? campaign.name : null,
      brandName: brand ? brand.name : null,
    };

    // Devolver los datos combinados
    return { data: { postCreated: combinedData } };
  } catch (error: any) {
    throw new Error(error);
  }
}






