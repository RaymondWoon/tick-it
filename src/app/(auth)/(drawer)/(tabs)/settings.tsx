/* ./src/app/(auth)/(drawer)/(tabs)/settings.tsx */

// ==================================================
// Core
// ==================================================
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "expo-router";

// ==================================================
// Components
// ==================================================
import ThemedScreenWrapper from "#components/themed/ScreenWrapper";
import TabHeader from "#components/themed/TabHeader";
import ThemedText from "#components/themed/Text";

const Settings = () => {
  // ==================================================
  // State & Hooks
  // ==================================================
  /* access the underlying navigation props */
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  // ==================================================
  // Render
  // ==================================================

  return (
    <ThemedScreenWrapper>
      <TabHeader onPressLeft={() => navigation.openDrawer()}>
        <ThemedText type="subtitle">Settings</ThemedText>
      </TabHeader>
      <View style={styles.temp}>
        <Text style={{ fontSize: 18 }}>Settings Screen</Text>
      </View>
    </ThemedScreenWrapper>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  temp: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
