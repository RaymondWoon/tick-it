/* Core */
import { TouchableOpacity } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

/* Components */
import LogoutBtn from "#components/LogoutBtn";

/* Context */
//import { useAuth } from "#context/Auth.context";
import { useAuth } from "#store/Auth.context";

const TabsLayout = () => {
  const { signOut } = useAuth();

  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();

    router.replace("/sign-in");
  };

  return (
    <Tabs
      screenOptions={{
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
      <Tabs.Screen name="index" options={{ tabBarLabel: "Home" }} />
      <Tabs.Screen name="profile" options={{ tabBarLabel: "Profile" }} />
    </Tabs>
  );
};

export default TabsLayout;
