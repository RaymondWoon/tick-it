/* Core */
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import * as Icons from "phosphor-react-native";

/* Hooks */

/* Components */
import ThemedInput from "#components/ThemedInput";
import ThemedSafeAreaView from "#components/ThemedSafeAreaView";
import ThemedText from "#components/ThemedText";
import ThemedView from "#components/ThemedView";

/* Types */

/* Context */

/* Constants */
import { sizes, spacingY } from "#theme";

/* Styles */

/* Misc */
import {
  windowWidth as hScale,
  windowHeight as vScale,
} from "#utils/ScreenDimensions";

import { LogoImg } from "#theme/Images";

/* this is temporary */
import { useThemeColors } from "#hooks/useThemeColors";
import { useCustomTheme, Themes } from "#context/Theme.context";

const RegisterScreen = () => {
  const { colors } = useThemeColors();

  return (
    <ThemedSafeAreaView>
      <ThemedView style={styles.logoContainer}>
        <Image source={LogoImg} style={styles.logo} testID="logo" alt="logo" />
      </ThemedView>
      <View style={styles.formContainer}>
        <ThemedText type="title">Tick-it</ThemedText>
        <ThemedInput
          icon={
            <Icons.User
              size={vScale(26)}
              color={colors.color.textSubtle}
              weight="thin"
            />
          }
          placeholder="User name"
        ></ThemedInput>
      </View>

      <TextInput placeholder="Email" />
      <TextInput placeholder="Password" />
      <TextInput placeholder="Confirm password" />
      <TouchableOpacity>
        <Text>Create account</Text>
      </TouchableOpacity>
      <View>
        <Text>Have an account? </Text>
        <Pressable>
          <Text>Sign-in</Text>
        </Pressable>
      </View>
    </ThemedSafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  logoContainer: {
    height: vScale(100),
    alignItems: "center",
  },
  logo: {
    width: vScale(100),
    height: vScale(100),
  },
  formContainer: {
    alignItems: "center",
    gap: spacingY._20,
  },
  title: {
    fontSize: 20,
  },
});
