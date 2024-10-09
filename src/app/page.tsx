"use client";
import Footer from "src/components/Footer";
import TransactionWrapper from "src/components/TransactionWrapper";
import WalletWrapper from "src/components/WalletWrapper";
import { ONCHAINKIT_LINK } from "src/links";
import OnchainkitSvg from "src/svg/OnchainkitSvg";
import { useAccount } from "wagmi";
import LoginButton from "../components/LoginButton";
import SignupButton from "../components/SignupButton";
import { Button } from "../components/ui/button";
import { ReadBrand } from "../service/brand";
import AddKolWrapper from "../components/blockchain/AddKolWrapper";
import CreatePostWrapper from "../components/blockchain/CreatePostWrapper";
import JoinCampaign from "../components/blockchain/JoinCampaign";
import { GET_DATA } from "../thegraph/queries";
import { useQuery } from "@apollo/client";

export default function Page() {
  const { address } = useAccount();
  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ${error.toString()}</p>;

  console.log("data : ", data);

  return (
    <div className="flex h-full w-96 max-w-full flex-col px-1 md:w-[1008px]">
      <ReadBrand />

      <section className="mt-6 mb-6 flex w-full flex-col md:flex-row">
        <div className="flex items-center gap-3">
          <SignupButton />
          {!address && <LoginButton />}
        </div>
      </section>
      <section className="templateSection flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-gray-100 px-2 py-4 md:grow">
        <div className="flex h-[450px] w-[450px] max-w-full items-center justify-center rounded-xl bg-[#030712]">
          <div className="rounded-xl bg-[#F3F4F6] px-4 py-[11px]">
            <p className="font-normal text-indigo-600 text-xl not-italic tracking-[-1.2px]">
              npm install @coinbase/onchainkit
            </p>
          </div>
        </div>
        {address ? (
          <>
            <h1>Paso 1: Unirse como KOL</h1>
            <AddKolWrapper address={address} />
            <h1>Paso 2: Unirse a Campaña</h1>
            <JoinCampaign address={address} idCampaign={1} />
            <h1>Paso 3: Crear Post</h1>
            <CreatePostWrapper address={address} />
          </>
        ) : (
          <WalletWrapper
            className="w-[450px] max-w-full"
            text="Sign in to transact"
          />
        )}

        {data.postCreateds.map((p: any) => (
          <div key={p.id}>
            <p>Los votos</p>
            <p>Id Campaign : {p.idCampaign}</p>
            <p>Id Post : {p.idPost}</p>
            <p>Address Kol : {p.kol}</p>
            <p>URL : {p.url}</p>
          </div>
        ))}
      </section>
      <Button>Click me</Button>
      <Footer />
    </div>
  );
}
