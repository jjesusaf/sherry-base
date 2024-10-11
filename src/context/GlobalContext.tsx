// src/context/AppContext.tsx
"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Definir el tipo de valor para nuestro contexto combinado
interface AppContextType {
  idCampaign: string | null;
  setIdCampaign: (id: string) => void;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
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
  // Al inicializar, intenta obtener el valor desde el sessionStorage
  const [idCampaign, setIdCampaignState] = useState<string | null>(
    () => sessionStorage.getItem("idCampaign") || null
  );
  
  // Estados del LoadingContext
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect para actualizar el sessionStorage cada vez que idCampaign cambie
  useEffect(() => {
    if (idCampaign) {
      sessionStorage.setItem("idCampaign", idCampaign);
    } else {
      sessionStorage.removeItem("idCampaign");
    }
  }, [idCampaign]);

  // Función que actualiza tanto el estado como el sessionStorage
  const setIdCampaign = (id: string) => {
    setIdCampaignState(id);
  };

  return (
    <AppContext.Provider
      value={{
        idCampaign,
        setIdCampaign,
        isLoading,
        setLoading: setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
