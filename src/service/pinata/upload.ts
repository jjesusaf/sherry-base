import { Post } from "@/src/interface/post"
import { PinataSDK } from "pinata-web3"

const PINATA_JTW = process.env.PINATA_API_KEY || ''
const GATEWAY_IPFS = process.env.VITE_GATEWAY_IPFS || ''

if (!PINATA_JTW || !GATEWAY_IPFS) {
    throw new Error("PINATA_JWT or GATEWAY_IPFS not set")
}

const pinata = new PinataSDK({
    pinataJwt: PINATA_JTW
})

export async function createPost(post: Post) {
    const image = await uploadFile(post.file);
    const metadata = await uploadMetadataToPinata(post.name, post.description, image, post.attributes);
    // Crear Link dub.co
    // Subir Imagen Pinata
    // Subir Metadata Pinata
    // Enviar la tx a la Blockchain
}

export async function uploadFile(file: File): Promise<string> {
    const result = "";
    try {
        const upload = await pinata.upload.file(file)
        console.log(upload)
        return upload.IpfsHash
    } catch (error) {
        console.log(error);
    } finally {
        return result;
    }
}

export async function uploadMetadataToPinata(
    name: string,
    description: string,
    imageUrl: string,
    attributes: Record<string, any>[]
) {
    let result = "";
    try {
        const finalImgUrl = `${GATEWAY_IPFS}${imageUrl}`
        const upload = await pinata.upload.json({
            name: name,
            description: description,
            image: finalImgUrl,
            attributes: attributes
        })

        return result = `${GATEWAY_IPFS}${upload.IpfsHash}`
    } catch (error) {
        console.log(error);
    } finally {
        return result;
    }
}

export async function getMetadata(uri: string) {
    const data = await fetch(uri)
    return data
}
