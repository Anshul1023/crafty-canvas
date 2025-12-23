import { useEffect, useState, createContext, useContext, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Replace these with your own API calls
  const signIn = async (email: string, password: string) => {
    try {
      // TODO: Replace with your API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   body: JSON.stringify({ email, password })
      // });
      
      // Mock successful login for demo
      const mockUser = { id: "1", email, name: email.split("@")[0] };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      return { error: null };
    } catch (error) {
      return { error: "Login failed. Please try again." };
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      // TODO: Replace with your API call
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   body: JSON.stringify({ email, password, name })
      // });
      
      // Mock successful signup for demo
      const mockUser = { id: "1", email, name };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      return { error: null };
    } catch (error) {
      return { error: "Signup failed. Please try again." };
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
