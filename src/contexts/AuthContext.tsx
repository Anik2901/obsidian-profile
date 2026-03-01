import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { auth, participants } from "@/lib/api";
import type { Participant, AuthResponse, RegisterRequest, LoginRequest } from "@/types/api";

interface AuthContextType {
  user: Participant | null;
  token: string | null;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<AuthResponse>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Participant | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("nexus_token"));
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const me = await participants.me();
      setUser(me);
    } catch {
      localStorage.removeItem("nexus_token");
      setToken(null);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchUser().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [token, fetchUser]);

  const login = async (data: LoginRequest) => {
    const res = await auth.login(data);
    localStorage.setItem("nexus_token", res.access_token);
    setToken(res.access_token);
  };

  const register = async (data: RegisterRequest) => {
    const res = await auth.register(data);
    localStorage.setItem("nexus_token", res.access_token);
    setToken(res.access_token);
    return res;
  };

  const logout = () => {
    localStorage.removeItem("nexus_token");
    setToken(null);
    setUser(null);
  };

  const refreshUser = fetchUser;

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
