import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

// Create the context "broadcast tower"
const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check for an active session right when the app loads
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 2. Listen for auth changes (sign in, sign out, etc.) automatically
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Expose the user object and loading state to the entire app
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Custom hook to make it incredibly easy to use anywhere in the app
export const useAuth = () => useContext(AuthContext);
