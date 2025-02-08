/**
 * Authentication context module providing global state and methods
 * @module
 */

// ==================================================
// Core
// ==================================================
import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User, onAuthStateChanged } from "firebase/auth";

// ==================================================
// Services
// ==================================================
import { login, logout, register, updateUserProfile } from "./Auth.service";

// ==================================================
// Configuration
// ==================================================
import { FIREBASE_AUTH } from "#config/Firebase.config";

// ==================================================
// Types & Interfaces
// ==================================================

/**
 * Authentication context interface defining available state and methods
 * for managing user authentication throughout the application
 * @interface
 */
interface AuthContextType {
  /**
   * Creates and authenticates a new user account
   * @param {string} username: User's display name
   * @param {string} email: User's email address
   * @param {string} password: User's password
   * @param {string} confirmPassword: User's password confirmation
   * @returns {Promise<User | undefined>}: Created user or undefined
   */
  signUp: (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<User | undefined>;

  /**
   * Authenticates an existing user with their credentials
   * @param {string} email : User's email address
   * @param {string} password: User's password
   * @returns {Promise<User | undefined>}: Authenticated user or undefined
   */
  signIn: (email: string, password: string) => Promise<User | undefined>;

  /**
   * Logs our the current user and clears the session
   * @returns {void}
   */
  signOut: () => void;

  /**
   * Update the user profile in Firebase.
   * The physical image is stored in Firebase Storage,
   * but the actual uri reference is stored in Firebase
   * @param user
   * @param username
   * @param photoURL
   * @returns
   */
  updateUserProfile: (
    user: User,
    username: string,
    photoURL?: string | undefined
  ) => Promise<void>;

  /** Currently authenticated user */
  user?: User;

  /** State for completion of authentication methods */
  initialized: boolean;

  /** Errors to provide feedback to the user */
  err: string[];
}

// ==================================================
// Context Creation
// ==================================================
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// ==================================================
// Hook
// ==================================================

/**
 * Custom hook to access the authentication context
 * @returns {AuthContextType}: Authentication context value
 *
 */
export const useAuth = () => {
  const ctx = useContext(AuthContext);

  return {
    user: ctx.user,
    signUp: ctx.signUp,
    signIn: ctx.signIn,
    signOut: ctx.signOut,
    updateUserProfile: ctx.updateUserProfile,
    initialized: ctx.initialized,
    err: ctx.err,
  };
};

// ==================================================
// Provider Component
// ==================================================

/**
 * AuthContextProvider that manages authentication state
 * @param {Object} props: Object props
 * @param {ReactNode} props.children: Child components
 * @returns {JSXElement}: Provider component
 */
export function AuthContextProvider(props: { children: ReactNode }) {
  //export const AuthContextProvider({children}: PropsWithChildren) => {
  // ==================================================
  // State & Hooks
  // ==================================================
  /**
   * Current authenticated user state
   * @type {[User | null, React.Dispatch<React.SetStateAction<User | null>>]}
   */
  const [user, setUser] = useState<User | undefined>(undefined);
  /**
   * Loading state for authentication methods
   * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
   */
  const [isLoading, setIsLoading] = useState<boolean>(false);
  /**
   * Error state to provide feedback to the user
   * @type {[string[], React.Dispatch<React.SetStateAction<string[]>>]}
   */
  const [err, setErr] = useState<string[]>([]);
  /**
   * State to manage the completion of all authentication methods
   * for feedback to the application
   * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
   */
  const [initialized, setInitialized] = useState<boolean>(false);

  // ==================================================
  // Effects
  // ==================================================

  /**
   * Firebase authentication state listener
   * Automatically updates user state on auth changes
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setUser(user);
        setIsLoading(false);
      }

      setInitialized(true);
    });

    /* Cleanup subscription */
    return () => unsubscribe();
  }, []);

  // ==================================================
  // Handlers
  // ==================================================

  /**
   * Handles user sign-in process
   * @param {string} email: User's email address
   * @param {string} password: User's password
   * @returns {Promise<User | undefined>} Authenticated user or undefined
   */
  const handleSignIn = async (email: string, password: string) => {
    /* clear any previous errors */
    setErr([]);
    /* awaiting response */
    setIsLoading(true);

    /* Fields cannot be empty */
    if (email == "" || password == "") {
      setErr([...err, "Please fill in all fields."]);
      return;
    }

    try {
      const response = await login(email, password);

      if (response) {
        if (response.user) {
          /* Successful sign-in, update the user state */
          setUser(response.user);
          /* response received */
          setIsLoading(false);
          /* authentication completed */
          setInitialized(true);

          return response.user;
        } else {
          /* Unsuccessful sign-in, error feedback to user */
          setErr([...err, "Sign-in failed."]);
          return undefined;
        }
      } else {
        /* Unsuccessful sign-in, error feedback to user */
        setErr([...err, "Sign-in failed."]);
        return undefined;
      }
    } catch (error: any) {
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/invalid-email"
      ) {
        setErr([...err, "Invalid credentials"]);
      } else {
        setErr([...err, error.response.data.msg]);
      }

      /* response received */
      setIsLoading(false);
      console.log("~handleSignIn error~ -> ", error.response.data.msg);
      return undefined;
    }
  };

  /**
   * Handles new user registration process
   * @param {string} username: User's display name
   * @param {string} email: User's email address
   * @param {string} password: User's password
   * @param {string} confirmPassword: User's confirmation password
   * @returns {Promise<User | undefined>}: Created user or undefined
   */
  const handleSignUp = async (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    /* clear any previous errors */
    setErr([]);
    /* awaiting response */
    setIsLoading(true);

    /**
     * Data validation
     */
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
      const response = await register(username, email, password);

      if (response) {
        if (response.user) {
          /* Successful registration, update the user state */
          setUser(response.user);
          /* response received */
          setIsLoading(false);
          /* authentication completed */
          setInitialized(true);

          return response.user;
        } else {
          /* Unsuccessful registration, error feedback to user */
          setErr([...err, "Registration failed."]);
          return undefined;
        }
      } else {
        /* Unsuccessful registration, error feedback to user */
        setErr([...err, "Registration failed."]);
        /* response received */
        setIsLoading(false);
        return undefined;
      }
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setErr([...err, "Email already in use."]);
      } else {
        setErr([...err, error.response.data.msg]);
      }

      /* response received */
      setIsLoading(false);
      console.log("~handleSignUp error~ -> ", error.response.data.msg);
      return undefined;
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      setUser(undefined);
    } catch (error) {
      console.log("~handleSignOut error~ -> ", error);
    }
  };

  const handleUpdateUserProfile = async (
    user: User,
    username: string,
    photoURL?: string | undefined
  ) => {
    /* clear any previous errors */
    setErr([]);
    /* awaiting response */
    setIsLoading(true);

    /**
     * Data validation
     */
    /* field cannot be empty */
    if (username == "") {
      setErr([...err, "User name cannot be blank."]);
      return;
    }

    try {
      /* update the user profile */
      const response = await updateUserProfile(user, username, photoURL);
    } catch (error: any) {
      /* response received */
      setIsLoading(false);
      console.log(
        "~handleUpdateUserprofile error~ -> ",
        error.response.data.msg
      );
    }
  };

  const value = {
    user: user,
    signUp: handleSignUp,
    signIn: handleSignIn,
    signOut: handleSignOut,
    updateUserProfile: handleUpdateUserProfile,
    err: err,
    initialized: initialized,
  };

  // ==================================================
  // Render
  // ==================================================
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
