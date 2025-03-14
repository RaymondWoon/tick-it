/* ./src/app/(auth)/(drawer)/(tabs)/home.tsx */

// ==================================================
// Core
// ==================================================
import { StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "expo-router";

// ==================================================
// Components
// ==================================================
import ThemedScreenWrapper from "#components/themed/ScreenWrapper";
import TabHeader from "#components/themed/TabHeader";

// ==================================================
// Context
// ==================================================
import { useAuth } from "#store/Auth.context";
import { fontSizes } from "#theme";

const HomeScreen = () => {
  /**
   * Username state
   * @type {[string, React.Dispatch<React.SetStateAction<string>>]}
   */
  //const [username, setUsername] = useState<string>("");

  /* user authentication hook */
  const { user } = useAuth();

  const navigation = useNavigation<DrawerNavigationProp<any>>();

  // ==================================================
  // Effects
  // ==================================================
  // useEffect(() => {
  //   setUsername(user?.displayName || "");
  // }, []);

  // ==================================================
  // Render
  // ==================================================

  return (
    <ThemedScreenWrapper>
      <TabHeader onPressLeft={() => navigation.openDrawer()}>
        <Text style={{ fontSize: fontSizes.FONT18 }}>
          Hi {user?.displayName}
        </Text>
      </TabHeader>
      <View style={styles.temp}>
        <Text style={{ fontSize: 18 }}>Welcome {user?.displayName}</Text>
        <Text style={{ fontSize: 18 }}>Home Screen</Text>
      </View>
    </ThemedScreenWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  temp: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
