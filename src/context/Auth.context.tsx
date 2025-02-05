/* Core */
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
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
  initialized?: boolean;
}
//onLogin?: (email: string, password: string) => void; //Promise<any>;
//onLogout?: () => void; //Promise<void>;
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

    /* Firebase does not handle password verification */
    if (password !== confirmPassword) {
      setErr([...err, "Passwords do not match."]);
      return;
    }

    // console.log(username);
    // console.log(email);
    // console.log(password);
    // console.log(confirmPassword);

    // createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
    //   .then((u) => {
    //     setMobileUser(u);
    //     setIsLoading(false);
    //   })
    //   .catch((e) => {
    //     setIsLoading(false);
    //     console.log(e);
    //   });

    try {
      console.log(username);
      console.log(email);
      console.log(password);
      console.log(confirmPassword);

      const user = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );

      //console.log(user);
    } catch (error: any) {
      return { error: true, msg: error.response.data.msg };
    }
  };

  const handleLogin = (email: string, password: string) => {};

  const handleLogout = () => {};

  const handlePasswordReset = (email: string) => {};

  const value = {
    user: mobileUser,
    onRegister: handleRegister,
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

    initialized: ctx.initialized,
  };
};

//onLogin: ctx.onLogin,
//onLogout: ctx.onLogout,
//onPasswordReset: ctx.onPasswordReset,
