import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface CampaignCoverContextProps {
  campaignCover: string | null; // Data URL para previsualización
  campaignCoverFile: File | null; // Almacenar el archivo para enviar al backend
  setCampaignCover: (file: File | null) => void;
  clearCampaignCover: () => void;
}

export const CampaignCoverContext = createContext<CampaignCoverContextProps>({
  campaignCover: null,
  campaignCoverFile: null, // Iniciar como null
  setCampaignCover: () => {},
  clearCampaignCover: () => {},
});

export const CampaignCoverProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [campaignCover, setCampaignCoverState] = useState<string | null>(null); // Data URL para previsualización
  const [campaignCoverFile, setCampaignCoverFile] = useState<File | null>(null); // Archivo File

  // Cargar la imagen desde localStorage al inicializar el contexto (solo la data URL)
  useEffect(() => {
    const storedImage = localStorage.getItem('campaignCover');
    if (storedImage) {
      setCampaignCoverState(storedImage);
    }
  }, []);

  // Función para convertir el File a data URL y guardar en estado y localStorage
  const setCampaignCover = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCampaignCoverState(result); // Guardar la data URL para previsualización
        setCampaignCoverFile(file); // Guardar el archivo para enviar al backend
  
        console.log("Archivo guardado en el contexto:", file); // Log para verificar
        localStorage.setItem('campaignCover', result); // Guardar la data URL en localStorage
      };
      reader.readAsDataURL(file);
    } else {
      setCampaignCoverState(null);
      setCampaignCoverFile(null); // Limpiar el archivo también
      localStorage.removeItem('campaignCover');
    }
  };
  

  // Función para limpiar la imagen del estado, archivo y localStorage
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
