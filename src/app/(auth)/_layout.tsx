import { Stack } from "expo-router";

// const AuthLayout = () => {
//   console.log("AuthLayout");
//   return (
//     <Stack>
//       <Stack.Screen name="(drawer)" />
//     </Stack>
//   );
// };

// export default AuthLayout;

import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Redirect, Slot } from "expo-router";

import { useAuth } from "#store/Auth.context";

const AuthLayout = () => {
  const { user, initialized } = useAuth();

  if (!initialized) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color={"blue"} />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  return <Slot />;
};

export default AuthLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
