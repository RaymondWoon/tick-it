import { StyleSheet, Text, View } from "react-native";
import React, { PropsWithChildren } from "react";

export const CustomText = ({ children }: PropsWithChildren) => (
  <Text>{children}</Text>
);

const Login = () => {
  return (
    <View style={styles.container}>
      <CustomText>Welcome!</CustomText>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
