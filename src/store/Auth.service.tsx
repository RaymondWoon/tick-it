/**
 * Authentication service using Firebase
 * Provides methods for user authentication and session management
 * @module
 */

// ==================================================
// Core
// ==================================================
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";
import { FIREBASE_AUTH } from "#config/Firebase.config";

// ==================================================
// Types & Interfaces
// ==================================================
/**
 * User response from Firebase after authentication
 * @interface
 */
export interface FirebaseUserResponse {
  user: User;
}

/**
 * Authenticates a user with email and password
 * @param {string} email: User's email address
 * @param {string} password: User's password
 * @returns {Promise<FirebaseUser | undefined>}: Authenticated user data
 * @throws {Error} if authentication fails
 */
export async function login(
  email: string,
  password: string
): Promise<FirebaseUserResponse | undefined> {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );

    return { user: userCredential.user };
  } catch (error) {
    console.log("~Service login error~ -> ", error);
    throw error;
  }
}

/**
 * Logs out the current user by terminating their session
 * @returns {Promise<void>}
 * @throws {Error} If logout fails
 */
export async function logout(): Promise<void> {
  try {
    await signOut(FIREBASE_AUTH);
  } catch (error) {
    console.log("~Service logout error~ -> ", error);
    throw error;
  }
}

/**
 * Creates a new user account and sets their display name
 * @param {string} username: User's display name
 * @param {string} email: User's email address
 * @param {string} password: User's password
 * @returns {Promise<FirebaseUser | undefined>}: Created user data
 * @throws {error}: If registration fails
 */
export async function register(
  username: string,
  email: string,
  password: string
): Promise<FirebaseUserResponse | undefined> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );

    await updateProfile(userCredential.user, { displayName: username });

    return { user: userCredential.user };
  } catch (error) {
    console.log("~Service registration error~ -> ", error);
    throw error;
  }
}
