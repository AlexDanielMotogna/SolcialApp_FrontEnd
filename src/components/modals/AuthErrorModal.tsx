import React from "react";

interface AuthErrorModalProps {
  title?: string;
  message: string;
  onClose: () => void;
  className?: string; // Ajout pour permettre le passage de la classe depuis la page
}

const AuthErrorModal: React.FC<AuthErrorModalProps> = ({
  title = "Error",
  message,
  onClose,
  className = "text-xl", // Valeur par défaut harmonisée
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
    <div className={`bg-[#161618] border border-[#9945FF] rounded-2xl shadow-2xl p-10 flex flex-col items-center gap-6 w-full max-w-[440px] ${className}`}>
      <h2 className="text-red-500 text-4xl font-bold mb-2 text-center">{title}</h2>
      <p className="text-[#ACB5BB] text-xl text-center break-words">{message}</p>
      <button
        className="mt-2 px-8 py-3 rounded-xl bg-[#9945FF] text-white font-bold text-xl hover:bg-[#7c37cc] transition"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  </div>
);

export default AuthErrorModal;