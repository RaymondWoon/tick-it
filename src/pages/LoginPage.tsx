/* Core */
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

/* Hooks */

/* Components */

/* Types */

/* Context */

/* Constants */

/* Styles */

/* Misc */

import { LogoImg } from "#theme/Images";

const LoginPage = () => {
  return (
    <View>
      <Image source={LogoImg} style={styles.logo} role="img" alt="logo" />
      <Text style={styles.title}>Tick-it</Text>
      <TextInput placeholder="Email" />
      <TextInput placeholder="Password" />
      <TouchableOpacity>
        <Text>Sign-in</Text>
      </TouchableOpacity>
      <Pressable>
        <Text>Forgot password?</Text>
      </Pressable>
      <Pressable>
        <Text>Don't have an account? Sign-up</Text>
      </Pressable>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 20,
  },
});
