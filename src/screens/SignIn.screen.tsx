/* src/screens/SignIn.screen.tsx */

// ==================================================
// Core
// ==================================================
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import * as Icons from "phosphor-react-native";
import { Ionicons } from "@expo/vector-icons";

// ==================================================
// Components
// ==================================================
import ThemedScreenWrapper from "#components/themed/ScreenWrapper";
import ThemedView from "#components/themed/View";
import ThemedText from "#components/themed/Text";
import ThemedInput from "#components/themed/Input";
import ThemedButton from "#components/themed/Button";
import LinkButton from "#components/LinkButton";
import ErrorText from "#components/themed/ErrorText";

// ==================================================
// Context
// ==================================================
import { useAuth } from "#store/Auth.context";

// ==================================================
// Constants
// ==================================================
import { sizes, spacingY } from "#theme";

// ==================================================
// Utilities
// ==================================================
import {
  windowWidth as hScale,
  windowHeight as vScale,
} from "#utils/ScreenDimensions";

import { LogoImg } from "#theme/Images";

/* this is temporary */
import { useThemeColors } from "#hooks/useThemeColors";
import { useCustomTheme, Themes } from "#context/Theme.context";

type ThemeRowProps = {
  children: string;
  checked?: boolean;
  onPress: () => void;
};

const ThemeRow = ({ children, checked, onPress }: ThemeRowProps) => {
  const { colors } = useThemeColors();

  const checkedStyle: ViewStyle[] = [
    styles.checkbox,
    { borderColor: colors.color.text },
  ];

  if (checked) {
    checkedStyle.push({
      borderColor: colors.color.textGreen,
      backgroundColor: colors.color.textGreen,
    });
  }

  return (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <View style={checkedStyle} />
      <Text style={[styles.text, { color: colors.color.text }]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const Border = () => {
  const { colors } = useThemeColors();

  return (
    <View style={[styles.border, { backgroundColor: colors.color.border }]} />
  );
};

const SignInScreen = () => {
  // ==================================================
  // State & Hooks
  // ==================================================
  /**
   * User email state
   * @type {[string, React.Dispatch<React.SetStateAction<string>>]}
   */
  const [email, setEmail] = useState<string>("");
  /**
   * User password state
   * @type {[string, React.Dispatch<React.SetStateAction<string>>]}
   */
  const [password, setPassword] = useState<string>("");
  /**
   * State to show/hide the user's password
   * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
   */
  const [showPassword, setShowPassword] = useState<boolean>(false);

  /* user authentication hook */
  const { signIn, err } = useAuth();
  /* Theme colors hook */
  const { colors } = useThemeColors();
  /* Custom theme hook */
  const { theme, setTheme } = useCustomTheme();

  // ==================================================
  // Handlers
  // ==================================================

  /* Toggle the visibility of the password input */
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // ==================================================
  // Render
  // ==================================================

  return (
    <ThemedScreenWrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Logo */}
        <ThemedView style={styles.logoContainer}>
          <Image
            source={LogoImg}
            style={styles.logo}
            testID="logo"
            alt="logo"
          />
        </ThemedView>

        {/* Header Text */}
        <View style={styles.titleContainer}>
          {/* Title */}
          <ThemedText type="title">Welcome to Tick-it</ThemedText>
          {/* Subtitle */}
          <ThemedText type="subtitle">The EZ task manager app</ThemedText>
        </View>

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
          value={email}
          onChangeText={setEmail}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
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
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              textContentType="password"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.iconContainer}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={hScale(24)}
              color="#aaa"
              onPress={toggleShowPassword}
              testID="togglePwdIcon"
            />
          </View>
        </View>
        {/* End password input */}

        {/* Errors */}
        <View
          style={err?.length == 0 ? { display: "none" } : { display: "flex" }}
        >
          {err &&
            err.map((item, index) => <ErrorText key={index}>{item}</ErrorText>)}
        </View>

        {/* Sign-in button */}
        <ThemedButton
          onPress={() => signIn(email, password)}
          size="medium"
          bordered={true}
        >
          <Text>Sign In</Text>
        </ThemedButton>

        {/* Link to sign up */}
        <View style={{ flexDirection: "row" }}>
          <ThemedText>Don't have an account? </ThemedText>
          <LinkButton href="/sign-up" testID="sign-up">
            <Text style={{ color: colors.color.text }}>Sign Up</Text>
          </LinkButton>
        </View>

        {/* <ScrollView style={{ backgroundColor: colors.color.background }}>
          <Pressable>
            <Text>Forgot password?</Text>
          </Pressable>

          {Themes.map((key, index) => (
            <React.Fragment key={key}>
              <ThemeRow onPress={() => setTheme(key)} checked={theme === key}>
                {key}
              </ThemeRow>
              {index !== Themes.length - 1 && <Border />}
            </React.Fragment>
          ))}
        </ScrollView> */}
      </KeyboardAvoidingView>
    </ThemedScreenWrapper>
  );
};

export default SignInScreen;

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
  titleContainer: {
    alignItems: "center",
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
  border: {
    flex: 1,
    height: 1,
    backgroundColor: "red",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
  },
});
