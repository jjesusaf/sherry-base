"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function ClientSideTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Hook del cliente para obtener la ruta actual

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname} // Cambia cuando cambia la ruta
        initial={{ opacity: 0, x: -100 }} // Animación de entrada
        animate={{ opacity: 1, x: 0 }} // Animación durante la presencia
        exit={{ opacity: 0, x: 100 }} // Animación de salida
        transition={{ duration: 0.5 }} // Duración de la animación
        className="contents"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
