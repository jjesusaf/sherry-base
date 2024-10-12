"use server";
import { fetchMetadataFromIPFS } from "../../app/challengers/actions/ipfs";

const ENDPOINT_THE_GRAPH = process.env.ENDPOINT_THE_GRAPH as string;

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
export async function subGraphCampaigns() {
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
    return response.json();
  } catch (error: any) {
    throw new Error(error);
  }
}
export async function subGraphVotes() {
  try {
    const response = await fetch(ENDPOINT_THE_GRAPH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
        variables: {},
      }),
    });

    return response.json();
  } catch (error: any) {
    throw new Error(error);
  }
}

async function mergeSubGraphDataByAddress(idCampaign: string, address: string) {
  try {
    const postCreatedsResponse =
      await subGraphPostCreatedsByCampaign(idCampaign);
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
      const hasVoted = votedsByAddress.some(
        (vote: any) => vote.idPost === post.idPost
      );
      const hasVotedCampaign = votedsByAddress.some((vote: any) => {
        const votedPost = postCreateds.find(
          (p: any) => p.idPost === vote.idPost
        );
        return votedPost && votedPost.idCampaign === post.idCampaign;
      });
      const campaign = campaigns.find(
        (c: any) => c.idCampaign === post.idCampaign
      );
      const brand = brands.find((b: any) => b.idBrand === campaign.idBrand);
      return {
        ...post,
        hasVoted,
        hasVotedCampaign,
        campaignName: campaign ? campaign.name : null,
        brandName: brand ? brand.name : null,
      };
    });
    console.log(combinedData);
    return { data: { postCreateds: combinedData } };
  } catch (error: any) {
    throw new Error(error);
  }
}

export const subGraphPostCreatedsByCampaign = async (idCampaign: string) => {
  try {
    const response = await fetch(ENDPOINT_THE_GRAPH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
         {
              postCreateds(where: { idCampaign: "${idCampaign}" }) {
                id
                idCampaign
                idPost
                kol
                url
              }
            }
            `,
        variables: {
          idCampaign,
        },
      }),
    });
    return response.json();
  } catch (error: any) {
    throw new Error(error);
  }
}

async function fetchMetadataAndImageFromIPFS(ipfsUrl: string) {
  try {
    const metadata = await fetchMetadataFromIPFS(ipfsUrl);

    return {
      image: metadata?.image || "/images/example.png",
      title: metadata?.name || `Challenge`,
      description: metadata?.description || `Descripción del post`,
      external_url: metadata?.external_url || `Link url`,
    };
  } catch (error) {
    console.error(
      "Error al obtener metadata de IPFS para la URL:",
      ipfsUrl,
      error
    );
    return {
      image: "/images/example.png",
      title: `Challenge`,
      description: `Descripción del post`,
      external_url: `Link url`,
    };
  }
}

export async function postsByCampaigns(idCampaign: string) {
  try {
    const response = await subGraphPostCreatedsByCampaign(idCampaign);
    console.log(response);
    const data = response.data;

    if (data && data.postCreateds) {
      const mappedChallenges = await Promise.all(
        data.postCreateds.map(async (post: any, index: number) => {
          const metadata = await fetchMetadataAndImageFromIPFS(post.url);
          return {
            id_challenge: index + 1,
            id_post: post.idPost,
            title: metadata.title,
            description: metadata.description,
            image: metadata.image,
            external_url: metadata.external_url,
            hasVoted: post.hasVoted,
            hasVotedCampaign: post.hasVotedCampaign,
            campaignName: post.campaignName,
            brandName: post.brandName,
            kol: {
              id_kol: index + 1,
              name: ` ${post.kol}`,
              username: `user_${post.kol.slice(0, 6)}`,
              avatar: "https://github.com/shadcn.png",
            },
          };
        })
      );
      console.log(mappedChallenges);
      return mappedChallenges;
    } else {
      console.error("No se encontraron postCreateds en la respuesta");
    }
  } catch (error) {
    console.error("Error al obtener los datos del subGraph:", error);
  }
}

export async function postsByCampaignsAndAddress(
  idCampaign: string,
  address: string
) {
  try {
    const response = await mergeSubGraphDataByAddress(idCampaign, address);
    console.log(response);
    const data = response.data;

    if (data && data.postCreateds) {
      const mappedChallenges = await Promise.all(
        data.postCreateds.map(async (post: any, index: number) => {
          const metadata = await fetchMetadataAndImageFromIPFS(post.url);
          return {
            id_challenge: index + 1,
            id_post: post.idPost,
            title: metadata.title,
            description: metadata.description,
            image: metadata.image,
            external_url: metadata.external_url,
            hasVoted: post.hasVoted,
            hasVotedCampaign: post.hasVotedCampaign,
            campaignName: post.campaignName,
            brandName: post.brandName,
            kol: {
              id_kol: index + 1,
              name: ` ${post.kol}`,
              username: `user_${post.kol.slice(0, 6)}`,
              avatar: "https://github.com/shadcn.png",
            },
          };
        })
      );
      console.log(mappedChallenges);
      return mappedChallenges;
    } else {
      console.error("No se encontraron postCreateds en la respuesta");
    }
  } catch (error) {
    console.error("Error al obtener los datos del subGraph:", error);
  }
}
