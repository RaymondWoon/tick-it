import { View, Text } from "react-native";
import React from "react";

/* Context */
import { useAuth } from "#context/Auth.context";

const HomeScreen = () => {
  const { user } = useAuth();

  //console.log(user);

  return (
    <View>
      <Text>Welcome {user?.displayName}</Text>
    </View>
  );
};

export default HomeScreen;
