/* src/app/_layout.tsx */

// ==================================================
// Core
// ==================================================
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// ==================================================
// Context
// ==================================================
import { CustomThemeProvider } from "#context/Theme.context";
//import { AuthContextProvider, useAuth } from "#context/Auth.context";
import { AuthContextProvider, useAuth } from "#store/Auth.context";

// ==================================================
// Preliminary ops
// ==================================================
export {
  //Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

/**
 * Contains all the logic for the RootLayout
 * @returns if the app is waiting on a response, the ActivityIndicator
 *          for unauthenticated users, the sign-in/sign-up stack
 *          for authenticated users, access to the application via (auth)/tabs
 */
function InitialLayout() {
  // ==================================================
  // State & Hooks
  // ==================================================
  /* user authentication hook */
  const { user, initialized } = useAuth();
  /* load fonts */
  const [loaded, error] = useFonts({
    ...Ionicons.font,
  });
  /* provides access to navigation routes */
  const router = useRouter();
  /* list of selected file segments of the routes */
  const segments = useSegments();

  // ==================================================
  // Effects
  // ==================================================
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  /* hide splashscreen if the app has loaded */
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  /**
   * Controls access for authenticated user to secure routes.
   * Unauthenticated users can only access sign-in and sign-up
   */
  useEffect(() => {
    if (!initialized) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (user && !inAuthGroup) {
      router.replace("/(auth)/(drawer)/(tabs)/home");
    } else if (!user && inAuthGroup) {
      router.replace("/");
    }
  }, [initialized, user]);

  /*
   * Show the activity indicator if waiting
   * on assets to be loaded or a response from the system
   */
  if (!loaded) {
    return <ActivityIndicator size={"large"} />;
  }

  // ==================================================
  // Render
  // ==================================================

  /**
   * If initialized and unauthenticated, return the sign-in/sign-up stack.
   * Otherwise, return the activity indicator
   */
  return (
    <>
      {initialized ? (
        // <Stack screenOptions={{ headerShown: false }}>
        //   <Stack.Screen name="sign-in" />
        //   <Stack.Screen name="sign-up" />
        //   <Stack.Screen name="(auth)" />
        // </Stack>
        <Slot />
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}
    </>
  );
}

/**
 * The highest level layout in the app and, wraps all other layouts and screens
 * It provides:
 * 1. Global authentication context via AuthContext Provider
 * 2. Global theme implementation via CustomThemeProvider
 * 3. InitialLayout hosts the required logic for authentication and access to the routes
 * @returns
 */
const RootLayout = () => {
  return (
    <AuthContextProvider>
      <CustomThemeProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <InitialLayout />
        </GestureHandlerRootView>
      </CustomThemeProvider>
    </AuthContextProvider>
  );
};

export default RootLayout;
