/* Core */
import { useEffect } from "react";
import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

/* Context */
import { CustomThemeProvider } from "#context/Theme.context";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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

  if (!loaded) {
    return null;
  }

  return (
    <CustomThemeProvider>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </CustomThemeProvider>
  );
}
