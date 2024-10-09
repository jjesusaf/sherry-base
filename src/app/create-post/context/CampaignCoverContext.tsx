"use client";
import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface CampaignCoverContextProps {
  campaignCover: string | null; // Data URL para previsualización
  campaignCoverFile: File | null; // Almacenar el archivo para enviar al backend
  setCampaignCover: (file: File | null) => void;
  clearCampaignCover: () => void;
}

export const CampaignCoverContext = createContext<CampaignCoverContextProps>({
  campaignCover: null,
  campaignCoverFile: null, 
  setCampaignCover: () => {},
  clearCampaignCover: () => {},
});

export const CampaignCoverProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [campaignCover, setCampaignCoverState] = useState<string | null>(null);
  const [campaignCoverFile, setCampaignCoverFile] = useState<File | null>(null); 

  useEffect(() => {
    const storedImage = localStorage.getItem('campaignCover');
    if (storedImage) {
      setCampaignCoverState(storedImage);
    }
  }, []);

  const setCampaignCover = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCampaignCoverState(result); 
        setCampaignCoverFile(file); 
  
        console.log("Archivo guardado en el contexto:", file); 
        localStorage.setItem('campaignCover', result); 
      };
      reader.readAsDataURL(file);
    } else {
      setCampaignCoverState(null);
      setCampaignCoverFile(null); 
      localStorage.removeItem('campaignCover');
    }
  };
  

  const clearCampaignCover = () => {
    setCampaignCoverState(null);
    setCampaignCoverFile(null);
    localStorage.removeItem('campaignCover');
  };

  return (
    <CampaignCoverContext.Provider value={{ campaignCover, campaignCoverFile, setCampaignCover, clearCampaignCover }}>
      {children}
    </CampaignCoverContext.Provider>
  );
};
