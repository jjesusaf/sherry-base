"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { subGraphKolCampaignsByAddress } from "@/src/actions/subgraph/kol-campaigns-by-kol";
import { useAccount } from "wagmi";

// Definir el tipo de valor para nuestro contexto combinado
interface AppContextType {
  idCampaign: string | null;
  setIdCampaign: (id: string) => void;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  idKolCampaign: number;
  address: string;
}

// Crear el contexto
const AppContext = createContext<AppContextType | undefined>(undefined);

// Crear un hook para usar fácilmente el contexto combinado
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext debe ser utilizado dentro de un AppProvider");
  }
  return context;
};

// Crear el provider que manejará el contexto global de la app
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Inicializa el estado con null, y luego en useEffect obtenemos el valor de sessionStorage
  const [idCampaign, setIdCampaignState] = useState<string | null>(null);

  // Estados del LoadingContext
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [idKolCampaign, setIdKolCampaign] = useState<number>(0);

  const { address } = useAccount();

  // useEffect para obtener el valor de sessionStorage al cargar en el cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedIdCampaign = sessionStorage.getItem("idCampaign");
      if (storedIdCampaign) {
        setIdCampaignState(storedIdCampaign);
      }
    }
  }, []); // Solo se ejecuta una vez al montar el componente

  // useEffect para actualizar el sessionStorage cada vez que idCampaign cambie
  useEffect(() => {
    if (!idCampaign) return
    if(!address) return

    if (typeof window !== "undefined") {
      if (idCampaign) {
        sessionStorage.setItem("idCampaign", idCampaign);
      } else {
        sessionStorage.removeItem("idCampaign");
      }
    }

    getIdKolCampaign(idCampaign, address);
    
  }, [idCampaign, address]); // Se ejecuta cada vez que idCampaign cambie

  // Función que actualiza tanto el estado como el sessionStorage
  const setIdCampaign = (id: string) => {
    setIdCampaignState(id);
  };

  const getIdKolCampaign = async (id_campaign: string, address: string) => {  
    const { data } = await subGraphKolCampaignsByAddress(address, id_campaign);
    //console.log("DATA CONTEXT", data);
    if(data.kolCampaignAddeds.length === 0) {
      setIdKolCampaign(0);
    }else{
      const kolCampaign = data.kolCampaignAddeds[0];
      //console.log("ID KOL CAMPAIGN CONTEXT", kolCampaign.idKolCampaign);

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
