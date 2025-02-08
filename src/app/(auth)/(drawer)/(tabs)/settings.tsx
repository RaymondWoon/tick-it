/* ./src/app/(auth)/(drawer)/(tabs)/settings.tsx */

import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Settings = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18 }}>Settings Screen</Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
