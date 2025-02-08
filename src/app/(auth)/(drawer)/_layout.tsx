/* src/app/(auth)/(drawer)/_layout.tsx */

// ==================================================
// Core
// ==================================================
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// ==================================================
// Hooks
// ==================================================
import { useThemeColors } from "#hooks/useThemeColors";

const DrawerLayout = () => {
  const { colors } = useThemeColors();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerStyle: { backgroundColor: colors.color.background },
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{ drawerLabel: "Home", headerShown: false }}
        />
        <Drawer.Screen
          name="profile"
          options={{ drawerLabel: "Profile", title: "Profile" }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
