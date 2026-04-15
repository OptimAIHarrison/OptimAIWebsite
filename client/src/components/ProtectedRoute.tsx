import { useAdmin } from "@/contexts/AdminContext";
import { useLocation } from "wouter";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, checkAuth } = useAdmin();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated && !checkAuth()) {
      setLocation("/admin/login");
    }
  }, [isAuthenticated, checkAuth, setLocation]);

  if (!isAuthenticated && !checkAuth()) {
    return null;
  }

  return <>{children}</>;
}
