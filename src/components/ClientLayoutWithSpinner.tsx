// src/components/ClientLayoutWithSpinner.tsx
"use client"; // Marcamos este componente como Client Component

import { useAppContext } from "../context/GlobalContext";
import Spinner from "./Spinner";

const ClientLayoutWithSpinner = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useAppContext(); // Ahora sí puedes usar hooks aquí

  return (
    <>
      {isLoading && <Spinner />}
      {children}
    </>
  );
};

export default ClientLayoutWithSpinner;
