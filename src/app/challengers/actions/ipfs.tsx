// actions/ipfs.ts

export async function fetchMetadataFromIPFS(url: string) {
    try {
      const response = await fetch(url); // Hacemos la petición a la URL
      if (!response.ok) {
        throw new Error("Error al obtener metadata desde IPFS");
      }
  
      const metadata = await response.json(); // Parseamos la respuesta como JSON
      return metadata; // Devuelve el JSON completo para usar las propiedades necesarias
    } catch (error) {
      console.error("Error al obtener metadata:", error);
      return null; // Maneja el error y retorna null si falla
    }
  }
  