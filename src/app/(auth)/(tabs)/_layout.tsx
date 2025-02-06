/* Core */
import { Tabs } from "expo-router";

/* Components */
import LogoutBtn from "#components/LogoutBtn";

/* Context */
import { useAuth } from "#context/Auth.context";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ tabBarLabel: "Home", headerRight: () => <LogoutBtn /> }}
      />
      <Tabs.Screen name="profile" options={{ tabBarLabel: "Profile" }} />
    </Tabs>
  );
};

export default TabsLayout;
