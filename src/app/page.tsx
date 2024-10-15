"use client";
import { useAccount } from "wagmi";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from 'nextjs-toploader/app';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/home");
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);
  return (
    <div
      className={`flex items-center flex-col gap-[20px] relative justify-center h-screen p-[20px]`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <Image
          src="/icons/icon-home.svg"
          width={100}
          height={100}
          alt="logo"
        />
      </motion.div>
    </div>
  );
}
