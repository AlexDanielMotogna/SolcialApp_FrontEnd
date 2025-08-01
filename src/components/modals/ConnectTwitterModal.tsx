// REEMPLAZAR COMPLETAMENTE: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\components\modals\ConnectTwitterModal.tsx

import React from 'react';

interface ConnectTwitterModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: any; // ✅ CAMBIAR DE userId A user
}

const ConnectTwitterModal: React.FC<ConnectTwitterModalProps> = ({
  isOpen,
  onClose,
  user, // ✅ USAR user EN LUGAR DE userId
}) => {
  if (!isOpen) return null;

  const handleConnectTwitter = () => {
    if (!user?.id) {
      console.error('❌ [ConnectTwitterModal] No user ID available for Twitter connection');
      return;
    }

    console.log("🐦 [ConnectTwitterModal] Connecting to Twitter for user:", user.email);
    
    // ✅ USAR LA RUTA CORRECTA (la que creamos antes)
    window.location.href = '/api/twitter-auth/twitter'; // ✅ SIN userId en query
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-[#18181b] border border-[#44444A] p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
        <div className="text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Connect to Twitter
            </h2>
            <p className="text-gray-300 text-sm">
              You need to connect your Twitter account to participate in quests and complete social tasks.
            </p>
            
            {/* ✅ MOSTRAR INFO DEL USUARIO */}
            {user && (
              <div className="mt-4 p-3 bg-[#2C2C30] rounded-lg">
                <p className="text-[#ACB5BB] text-sm">
                  Connecting as: <span className="text-white font-medium">{user.email}</span>
                </p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <button
              onClick={handleConnectTwitter}
              disabled={!user?.id} // ✅ DISABLED SI NO HAY USER
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              Connect Twitter Account
            </button>
            
            <button
              onClick={onClose}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200"
            >
              Cancel
            </button>
          </div>

          {/* ✅ ERROR STATE */}
          {!user?.id && (
            <div className="mt-4 p-2 bg-red-950 rounded-lg">
              <p className="text-red-400 text-sm">
                ⚠️ Please log in first to connect Twitter
              </p>
            </div>
          )}

          <p className="text-xs text-gray-400 mt-4">
            We'll redirect you to Twitter to authorize access. You can revoke this permission at any time in your Twitter settings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConnectTwitterModal;