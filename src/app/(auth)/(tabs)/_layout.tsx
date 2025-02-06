/* Core */
import { TouchableOpacity } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

/* Components */
import LogoutBtn from "#components/LogoutBtn";

/* Context */
import { useAuth } from "#context/Auth.context";

const TabsLayout = () => {
  const { onLogout } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={onLogout}>
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
