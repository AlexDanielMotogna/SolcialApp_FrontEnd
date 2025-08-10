"use client";

import React, { useState, useEffect } from "react";
import BoostTokenModal from "@/components/modals/BoostTokenModal";
import { useRouter } from "next/navigation";

export default function BoostPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Ouvrir automatiquement le modal quand on arrive sur cette page
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Rediriger vers le dashboard après fermeture du modal
    router.push("/dashboard");
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-white text-center">
        <h1 className="text-2xl font-bold mb-4">Boost Token</h1>
        <p className="text-gray-400">Redirection vers le modal...</p>
      </div>

      {isModalOpen && (
        <BoostTokenModal isOpen={isModalOpen} onClose={handleCloseModal} />
      )}
    </div>
  );
}
