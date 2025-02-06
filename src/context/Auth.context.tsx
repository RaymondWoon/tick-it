/* Core */
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
/* @ts-ignore */
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
  User,
} from "@firebase/auth";

/* Misc */
import { FIREBASE_AUTH } from "#config/Firebase.config";

export interface AuthProps {
  user?: User | null;
  onRegister: (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<any>;
  onLogout: () => Promise<void>;
  initialized?: boolean;
  err: string[];
}
//onLogin?: (email: string, password: string) => void; //Promise<any>;
//
//onPasswordReset?: (email: string) => void; //Promise<void>;

const AuthContext = createContext<Partial<AuthProps>>({});

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [mobileUser, setMobileUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string[]>([]);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setMobileUser(user);
      setIsLoading(false);
      setInitialized(true);
    });
  }, []);

  const handleRegister = async (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    setErr([]);
    setIsLoading(true);

    /* Fields cannot be empty */
    if (
      username == "" ||
      email == "" ||
      password == "" ||
      confirmPassword == ""
    ) {
      setErr([...err, "Please fill in all fields."]);
      return;
    }

    /* minimum required password length is 6 */
    if (password.length < 6 || confirmPassword.length < 6) {
      setErr([...err, "Password must be at least 6 charaters"]);
      return;
    }

    /* Firebase does not handle password verification */
    if (password !== confirmPassword) {
      setErr([...err, "Passwords do not match."]);
      return;
    }

    try {
      /* create the user credentials */
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );

      setMobileUser(userCredential.user);
      setIsLoading(false);

      /* update the user display name */
      updateProfile(userCredential.user, { displayName: username });
    } catch (error: any) {
      setErr([, , , err, error.response.data.msg]);
      console.log(error.response.data.msg);
    }
  };

  const handleLogin = (email: string, password: string) => {};

  const handleLogout = async () => {
    setMobileUser(null);

    await signOut(FIREBASE_AUTH);
  };

  const handlePasswordReset = (email: string) => {};

  const value = {
    user: mobileUser,
    onRegister: handleRegister,
    onLogout: handleLogout,
    err,
    initialized: initialized,
  };
  //onLogin: handleLogin,
  //onLogout: handleLogout,
  //onPasswordReset: handlePasswordReset,

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  return {
    user: ctx.user,
    onRegister: ctx.onRegister,
    onLogout: ctx.onLogout,
    initialized: ctx.initialized,
    err: ctx.err,
  };
};

//onLogin: ctx.onLogin,
//onLogout: ctx.onLogout,
//onPasswordReset: ctx.onPasswordReset,
