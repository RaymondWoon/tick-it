/* ./src/app/(auth)/(drawer)/(tabs)/_layout.tsx */

/* Core */
import { Pressable, TouchableOpacity } from "react-native";
import { Tabs, useNavigation, useRouter } from "expo-router";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

/* Components */
import LogoutBtn from "#components/LogoutBtn";

/* Context */
//import { useAuth } from "#context/Auth.context";
import { useAuth } from "#store/Auth.context";

const TabsLayout = () => {
  const { signOut } = useAuth();

  const router = useRouter();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  const handleSignOut = async () => {
    await signOut();

    router.replace("/sign-in");
  };

  return (
    <Tabs
      screenOptions={{
        headerLeft: () => (
          <Pressable
            onPress={() => navigation.openDrawer()}
            style={{ marginLeft: 8 }}
          >
            <Ionicons name="menu" size={24} color={"#000"} />
          </Pressable>
        ),
        headerRight: () => (
          <TouchableOpacity
            onPressIn={handleSignOut}
            style={{ marginRight: 8 }}
          >
            <Ionicons name="log-out-outline" size={24} color={"#000"} />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen name="home" options={{ tabBarLabel: "Home" }} />
      <Tabs.Screen name="settings" options={{ tabBarLabel: "Settings" }} />
    </Tabs>
  );
};

export default TabsLayout;
