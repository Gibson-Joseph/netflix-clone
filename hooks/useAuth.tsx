import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User, //type in firebase
} from "firebase/auth";

import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "../firebase";

interface IAuth {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<IAuth>({
  // learn creactContext
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
});

interface AuthProviderProps {
  children: React.ReactNode; //children type
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null); //given firebase type
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();

  // Persisting the user
  useEffect(
    //refer the useEffect YT part2->(59:45)
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in...
          setUser(user);
          setLoading(false);
        } else {
          // Not logged in...
          setUser(null);
          setLoading(true);
          router.push("/login");
        }
        setInitialLoading(false);
      }),
    [auth]
  );

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user); // YT(41:42)
        router.push("/");
        setLoading(false);
      })
      .catch((error) => {
        return alert(error.message);
      })
      .finally(() => setLoading(false));
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user); // YT(41:42)
        router.push("/");
        setLoading(false);
      })
      .catch((error) => {
        return alert(error.message);
      })
      .finally(() => setLoading(false));
  };

  const logout = async () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  const memodeValue = useMemo(
    // YT->(57:00) please refer one more
    () => ({
      user,
      signIn,
      signUp,
      logout,
      loading,
      error,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={memodeValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
