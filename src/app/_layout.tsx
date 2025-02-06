/* Core */
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { Redirect, Slot, Stack, useRouter, useSegments } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

/* Context */
import { CustomThemeProvider } from "#context/Theme.context";
import { AuthContextProvider, useAuth } from "#context/Auth.context";

export {
  //Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function InitialLayout() {
  const { user, initialized } = useAuth();

  const router = useRouter();
  const segments = useSegments();

  const [loaded, error] = useFonts({
    ...Ionicons.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  console.log("Root Layout: initialized -> ", initialized);
  console.log("Root Layout: user -> ", user);

  useEffect(() => {
    if (!initialized) return;

    const inAuthGroup = segments[0] === "(auth)";
    console.log("Root Layout: inAuthGroup -> ", inAuthGroup);
    if (user && !inAuthGroup) {
      router.replace("/(auth)/(tabs)");
    } else if (!user && inAuthGroup) {
      router.replace("/");
      //<Redirect href={"/"} />;
    }
  }, [initialized, user]);

  if (!loaded || !initialized) {
    return <ActivityIndicator size={"large"} />;
  }

  return (
    <>
      {initialized ? (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="register" />
          <Stack.Screen name="(auth)/(tabs)" />
        </Stack>
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      )}
    </>
  );
}

const RootLayout = () => {
  return (
    <AuthContextProvider>
      <CustomThemeProvider>
        <InitialLayout />
      </CustomThemeProvider>
    </AuthContextProvider>
  );
};

export default RootLayout;
