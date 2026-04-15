import { createContext, useContext, useState, useEffect } from "react";

interface AdminContextType {
  isAuthenticated: boolean;
  email: string | null;
  login: (token: string, email: string) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in on mount
    const token = localStorage.getItem("adminToken");
    const storedEmail = localStorage.getItem("adminEmail");
    if (token && storedEmail) {
      setIsAuthenticated(true);
      setEmail(storedEmail);
    }
  }, []);

  const login = (token: string, userEmail: string) => {
    localStorage.setItem("adminToken", token);
    localStorage.setItem("adminEmail", userEmail);
    setIsAuthenticated(true);
    setEmail(userEmail);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    setIsAuthenticated(false);
    setEmail(null);
  };

  const checkAuth = () => {
    const token = localStorage.getItem("adminToken");
    return !!token;
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, email, login, logout, checkAuth }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
}
