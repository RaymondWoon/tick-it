/* ./src/app/(auth)/(drawer)/(tabs)/home.tsx */

import { StyleSheet, Text, View } from "react-native";
import React from "react";

/* Context */
import { useAuth } from "#store/Auth.context";

const HomeScreen = () => {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18 }}>Welcome {user?.displayName}</Text>
      <Text style={{ fontSize: 18 }}>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
