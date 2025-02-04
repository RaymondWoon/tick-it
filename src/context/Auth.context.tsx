/* Core */
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged, User } from "@firebase/auth";

/* Misc */
import { FIREBASE_AUTH } from "#config/Firebase.config";

interface AuthProps {
  user?: User | null;
  onRegister: (
    email: string,
    password: string,
    confirmPassword: string
  ) => void; //Promise<any>;
  onLogin: (email: string, password: string) => void; //Promise<any>;
  onLogout: () => void; //Promise<void>;
  onPasswordReset: (email: string) => void; //Promise<void>;
  initialized?: boolean;
}

const AuthContext = createContext<Partial<AuthProps>>({});

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [mobileUser, setMobileUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string[]>([]);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setMobileUser(user);
      setInitialized(true);
    });
  }, []);

  const handleRegister = (
    email: string,
    password: string,
    confirmPassword: string
  ) => {};

  const handleLogin = (email: string, password: string) => {};

  const handleLogout = () => {};

  const handlePasswordReset = (email: string) => {};

  const value = {
    user: mobileUser,
    onRegister: handleRegister,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onPasswordReset: handlePasswordReset,
    initialized: initialized,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  return {
    user: ctx.user,
    onRegister: ctx.onRegister,
    onLogin: ctx.onLogin,
    onLogout: ctx.onLogout,
    onPasswordReset: ctx.onPasswordReset,
    initialized: ctx.initialized,
  };
};
