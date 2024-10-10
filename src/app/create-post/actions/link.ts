"use server";
import { } from "dub"

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

export async function subGraph() {
  const response = await fetch(
    "https://api.studio.thegraph.com/query/90736/sherryg/version/latest",
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
  try {
  } catch (error) {
    throw error;
  }

  const data = await response.json();

  return data;
}
