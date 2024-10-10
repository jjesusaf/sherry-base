"use server";
import { } from "dub"

export async function getLink(linkId: string) {
  try {
    const DUB_API_KEY = process.env.NEXT_PUBLIC_DUB_API_KEY;
    const response = await fetch(`https://api.dub.co/links?linkId=${linkId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DUB_API_KEY}`,
      },
    });
    const data = await response.json();
    console.log("Link creado:", data);
    return data;
  } catch (error) {
    console.error("Error creando el enlace con Dub:", error);
    throw error;
  }
}