"use client";

import { useAuthUser } from "@/hooks/useAuthUser";
import { LoadingOverlay } from "@/components/ui/LoadingBar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface WithAuthProps {
  children: React.ReactNode;
  redirectTo?: string;
  loadingText?: string;
}

export const WithAuth = ({ 
  children, 
  redirectTo = "/login", 
  loadingText = "Checking authentication..." 
}: WithAuthProps) => {
  const { user, isAuthenticated, isUnauthenticated, isLoading } = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (isUnauthenticated) {
      router.replace(redirectTo);
    }
  }, [isUnauthenticated, router, redirectTo]);

  if (isLoading) {
    return (
      <LoadingOverlay 
        show={true} 
        text={loadingText} 
        variant="spinner" 
      />
    );
  }

  if (isUnauthenticated) {
    return (
      <LoadingOverlay 
        show={true} 
        text="Redirecting to login..." 
        variant="bar" 
      />
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Access denied. Please log in.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default WithAuth;
