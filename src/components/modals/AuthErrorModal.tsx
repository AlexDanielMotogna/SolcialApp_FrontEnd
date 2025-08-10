import React from "react";
import { useTranslation } from "react-i18next";

interface AuthErrorModalProps {
  title?: string;
  message: string;
  onClose: () => void;
  className?: string; // Optional className for additional styling
}

const AuthErrorModal: React.FC<AuthErrorModalProps> = ({
  title,
  message,
  onClose,
  className = "text-xl", // Default value for consistent styling
}) => {
  // Translation hook
  const { t } = useTranslation();

  return (
    // Modal overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      role="alertdialog"
      aria-modal="true"
      aria-label={t("error", "Error")}
    >
      {/* Modal content */}
      <div
        className={`bg-[#161618] border border-[#9945FF] rounded-2xl shadow-2xl p-10 flex flex-col items-center gap-6 w-full max-w-[440px] ${className}`}
      >
        {/* Modal title */}
        <h2 className="text-red-500 text-4xl font-bold mb-2 text-center">
          {title || t("error", "Error")}
        </h2>
        {/* Error message */}
        <p className="text-[#ACB5BB] text-xl text-center break-words">{message}</p>
        {/* Close button */}
        <button
          className="mt-2 px-8 py-3 rounded-xl bg-[#9945FF] text-white font-bold text-xl hover:bg-[#7c37cc] transition"
          onClick={onClose}
        >
          {t("close", "Close")}
        </button>
      </div>
    </div>
  );
};

export default AuthErrorModal;