import React, { createContext, useContext, ReactNode } from "react";

interface AuthContextProps {
  isAuthenticated: () => boolean;
  userRole: string | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token !== null && token !== undefined;
  };

  const getUserRole = () => {
    return localStorage.getItem("userRole");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole: getUserRole() }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
