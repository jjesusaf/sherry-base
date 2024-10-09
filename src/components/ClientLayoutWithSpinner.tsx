// src/components/ClientLayoutWithSpinner.tsx
"use client"; // Marcamos este componente como Client Component

import { useLoading } from "../context/LoadingContext";
import Spinner from "./Spinner";

const ClientLayoutWithSpinner = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useLoading(); // Ahora sí puedes usar hooks aquí

  return (
    <>
      {isLoading && <Spinner />}
      {children}
    </>
  );
};

export default ClientLayoutWithSpinner;
