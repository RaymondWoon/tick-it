/* Core */
import { useContext, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import * as Icons from "phosphor-react-native";
import { Ionicons } from "@expo/vector-icons";
//import { useHeaderHeight } from "@react-navigation/elements";

/* Hooks */

/* Components */
import ThemedScreenWrapper from "#components/themed/ScreenWrapper";
import ThemedInput from "#components/themed/Input";
import ThemedText from "#components/themed/Text";
import ThemedView from "#components/themed/View";
import ThemedButton from "#components/themed/Button";
import LinkButton from "#components/LinkButton";
import ErrorText from "#components/themed/ErrorText";

/* Types */

/* Context */
import { useAuth } from "#context/Auth.context";

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
  /* state to manage username */
  const [username, setUsername] = useState<string>("");
  /* state to manage email input */
  const [email, setEmail] = useState<string>("");
  /* state to manage password input */
  const [password, setPassword] = useState<string>("");
  /* state to manage confirmed password input */
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  /* state to toggle password visibility */
  const [showPassword, setShowPassword] = useState<boolean>(false);

  /* state to toggle confirm password visibility */
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  /* Auth hook */
  const auth = useAuth();
  //console.log(auth.err?.length);
  const { colors } = useThemeColors();
  //const headerHeight = useHeaderHeight();

  /* Handlers */
  //const handleCreateAccount =

  /* Toggle the visibility of the password input */
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  /* Toggle the visibility of the confirm password input */
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleOnRegister = () => {
    console.log("Handle register");
  };

  return (
    <ThemedScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ThemedView style={styles.logoContainer}>
          <Image
            source={LogoImg}
            style={styles.logo}
            testID="logo"
            alt="logo"
          />
        </ThemedView>
        <ThemedText type="title">Tick-it</ThemedText>
        {/* Username input */}
        <ThemedInput
          icon={
            <Icons.User
              size={vScale(26)}
              color={colors.color.textSubtle}
              weight="thin"
            />
          }
          placeholder="User name"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />
        {/* Email input */}
        <ThemedInput
          icon={
            <Icons.At
              size={vScale(26)}
              color={colors.color.textSubtle}
              weight="thin"
            />
          }
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        {/* Password input */}
        <View style={styles.passwordInputContainer}>
          <View style={{ flex: 1 }}>
            <ThemedInput
              icon={
                <Icons.LockSimple
                  size={vScale(26)}
                  color={colors.color.textSubtle}
                  weight="thin"
                />
              }
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.iconContainer} testID="togglePwdIcon">
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={hScale(24)}
              color="#aaa"
              onPress={toggleShowPassword}
            />
          </View>
        </View>
        {/* End password input */}
        {/* Confirm password input */}
        <View style={styles.passwordInputContainer}>
          <View style={{ flex: 1 }}>
            <ThemedInput
              icon={
                <Icons.Lock
                  size={vScale(26)}
                  color={colors.color.textSubtle}
                  weight="thin"
                />
              }
              placeholder="Confirm password"
              autoCapitalize="none"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          <View style={styles.iconContainer} testID="toggleConfirmPwdIcon">
            <Ionicons
              name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
              size={hScale(24)}
              color="#aaa"
              onPress={toggleShowConfirmPassword}
            />
          </View>
        </View>
        {/* End confirm password input */}

        {/* Errors */}
        <View
          style={
            auth.err?.length == 0 ? { display: "none" } : { display: "flex" }
          }
        >
          {auth.err && <ErrorText>{auth.err}</ErrorText>}
        </View>

        <ThemedButton
          onPress={() =>
            /* @ts-ignore */
            auth.onRegister(username, email, password, confirmPassword)
          }
          size="medium"
          bordered={true}
        >
          <Text>Register</Text>
        </ThemedButton>
        <View style={{ flexDirection: "row" }}>
          <ThemedText>Have an account? </ThemedText>
          <LinkButton href="/">
            <Text style={{ color: colors.color.text }}>Sign-in</Text>
          </LinkButton>
        </View>
      </KeyboardAvoidingView>
    </ThemedScreenWrapper>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: spacingY._15,
    paddingTop: vScale(20),
    paddingHorizontal: hScale(20),
  },
  logoContainer: {
    height: vScale(100),
    alignItems: "center",
    backgroundColor: "transparent",
  },
  logo: {
    width: vScale(100),
    height: vScale(100),
    backgroundColor: "transparent",
  },

  passwordInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  iconContainer: {
    marginLeft: hScale(10),
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: hScale(10),
    borderRadius: sizes._10,
    marginTop: vScale(10),
  },
  title: {
    fontSize: 20,
  },
});
