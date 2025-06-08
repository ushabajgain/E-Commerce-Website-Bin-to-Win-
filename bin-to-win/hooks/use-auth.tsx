"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

// Define user type
export type User = {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
  is_retailer: boolean;
  first_name: string;
  last_name: string;
  // Add more user fields as needed
};

// Define auth context type
type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
};

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  // Client-side storage functions
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };

  const setToken = (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
  };

  const removeToken = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  };

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          const userData = await authAPI.getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error("Auth check failed:", error);
          removeToken();
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authAPI.login(username, password);
      console.log("Login response:", response);
      setToken(response.token);

      // Get user data
      const userData = await authAPI.getCurrentUser();
      setUser(userData);

      toast({
        title: "Login successful",
        description: `Welcome back, ${userData.username}!`,
      });

      router.push("/");
    } catch (error: any) {
      console.error("Login failed:", error);
      setError(error.response?.data?.detail || "Invalid credentials");
      toast({
        title: "Login failed",
        description: error.response?.data?.detail || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (userData: any) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authAPI.register(userData);

      // Auto login after registration
      await login(userData.username, userData.password);

      toast({
        title: "Registration successful",
        description: "Your account has been created successfully!",
      });
    } catch (error: any) {
      console.error("Registration failed:", error);
      const errorMsg = error.response?.data?.detail || "Registration failed";
      setError(errorMsg);
      toast({
        title: "Registration failed",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      removeToken();
      setUser(null);
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, logout, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
