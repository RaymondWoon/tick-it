/* ./src/app/(auth)/(drawer)/(tabs)/_layout.tsx */

/* Core */
import { Pressable, TouchableOpacity } from "react-native";
import { Tabs, useNavigation, useRouter } from "expo-router";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

/* Components */
import LogoutBtn from "#components/LogoutBtn";
import AvatarViewer from "#components/AvatarViewer";

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
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          tabBarLabel: "Tasks",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "list" : "list-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="agenda"
        options={{
          tabBarLabel: "Agenda",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
