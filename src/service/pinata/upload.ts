import { Post } from "@/src/interface/post";
import { PinataSDK } from "pinata-web3";

const PINATA_JTW = process.env.NEXT_PUBLIC_PINATA_API_KEY || "";
const GATEWAY_IPFS = process.env.NEXT_PUBLIC_GATEWAY_IPFS || "";

if (!PINATA_JTW || !GATEWAY_IPFS) {
  throw new Error("PINATA_JWT or GATEWAY_IPFS not set");
}

const pinata = new PinataSDK({
  pinataJwt: PINATA_JTW,
});

export async function createPost(post: Post) {
  try {
    if (!post.file) {
      throw new Error("No file provided for the post.");
    }

    const image = await uploadFile(post.file);
    const metadata = await uploadMetadataToPinata(
      post.name,
      image,
      post.description,
      post.external_url,
      post.attributes
    );
    
    return metadata;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

export async function uploadFile(file: File): Promise<string> {
  try {
    const upload = await pinata.upload.file(file);
    console.log(upload);
    return upload.IpfsHash;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

export async function uploadMetadataToPinata(
  name: string,
  image: string,
  description: string,
  external_url: string,
  attributes: Record<string, any>[]
): Promise<string> {
  try {
    const finalImgUrl = `${GATEWAY_IPFS}${image}`;
    const upload = await pinata.upload.json({
      name: name,
      description: description,
      external_url: external_url,
      image: finalImgUrl,
      attributes: attributes,
    });

    return `${GATEWAY_IPFS}${upload.IpfsHash}`;
  } catch (error) {
    console.error("Error uploading metadata:", error);
    throw error;
  }
}

export async function getMetadata(uri: string) {
  const data = await fetch(uri);
  return data;
}
