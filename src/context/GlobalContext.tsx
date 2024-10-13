"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { subGraphKolCampaignsByAddress } from "@/src/actions/subgraph/kol-campaigns-by-kol";
import { useAccount } from "wagmi";

interface AppContextType {
  idCampaign: string | null;
  setIdCampaign: (id: string) => void;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  idKolCampaign: number;
  address: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(
      "useAppContext debe ser utilizado dentro de un AppProvider"
    );
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [idCampaign, setIdCampaignState] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("idCampaign") || null;
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [idKolCampaign, setIdKolCampaign] = useState<number>(0);

  const { address } = useAccount();

  useEffect(() => {
    if (!idCampaign) return;
    if (!address) return;

    if (typeof window !== "undefined") {
      // Guardar el idCampaign en localStorage
      if (idCampaign) {
        localStorage.setItem("idCampaign", idCampaign);
      } else {
        localStorage.removeItem("idCampaign");
      }
    }

    getIdKolCampaign(idCampaign, address);
  }, [idCampaign, address]);

  const setIdCampaign = (id: string) => {
    setIdCampaignState(id);
  };

  const getIdKolCampaign = async (id_campaign: string, address: string) => {
    const { data } = await subGraphKolCampaignsByAddress(address, id_campaign);
    if (data.kolCampaignAddeds.length === 0) {
      setIdKolCampaign(0);
    } else {
      const kolCampaign = data.kolCampaignAddeds[0];
      setIdKolCampaign(kolCampaign.idKolCampaign);
    }
    setIsLoading(false);
  };

  return (
    <AppContext.Provider
      value={{
        idCampaign,
        setIdCampaign,
        isLoading,
        setLoading: setIsLoading,
        idKolCampaign,
        address: address!,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
