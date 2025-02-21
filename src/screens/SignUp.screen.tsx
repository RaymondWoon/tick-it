/* src/screens/SignUp.screen.tsx */

// ==================================================
// Core
// ==================================================
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Icons from "phosphor-react-native";
import { Ionicons } from "@expo/vector-icons";

// ==================================================
// Hooks
// ==================================================

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

// ==================================================
// Assets
// ==================================================
import { LogoImg } from "#theme/Images";

/* this is temporary */
import { useThemeColors } from "#hooks/useThemeColors";
import { useCustomTheme, Themes } from "#context/Theme.context";

const SignUpScreen = () => {
  // ==================================================
  // State & Hooks
  // ==================================================
  /**
   * Username state
   * @type {[string, React.Dispatch<React.SetStateAction<string>>]}
   */
  const [username, setUsername] = useState<string>("");
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
   * User confirm password state
   * @type {[string, React.Dispatch<React.SetStateAction<string>>]}
   */
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  /**
   * State to show/hide the user's password
   * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
   */
  const [showPassword, setShowPassword] = useState<boolean>(false);
  /**
   * State to show/hide the user's confirm password
   * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
   */
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  /* user authentication hook */
  const { signUp, err } = useAuth();
  /* Theme colors hook */
  const { colors } = useThemeColors();

  // ==================================================
  // Handlers
  // ==================================================

  /**
   * Handles the sign-up process
   * @returns {Promise<User | null>}
   */
  const handleSignUp = async () => {
    try {
      return await signUp(username, email, password, confirmPassword);
    } catch (error) {
      console.error("~handleSignUp~ -> ", error);
      return null;
    }
  };

  /* Toggle the visibility of the password input */
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  /* Toggle the visibility of the confirm password input */
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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

        {/* Title */}
        <ThemedText type="title">Tick-it</ThemedText>

        {/* Username input */}
        <ThemedInput
          icon={
            <Ionicons
              name="person-outline"
              size={vScale(26)}
              color={colors.color.textSubtle}
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
            <Ionicons
              name="at-outline"
              size={vScale(26)}
              color={colors.color.textSubtle}
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
                <Ionicons
                  name="lock-closed-outline"
                  size={vScale(26)}
                  color={colors.color.textSubtle}
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
                <Ionicons
                  name="lock-closed-outline"
                  size={vScale(26)}
                  color={colors.color.textSubtle}
                />
              }
              placeholder="Confirm password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              textContentType="password"
              autoCapitalize="none"
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
          style={err?.length == 0 ? { display: "none" } : { display: "flex" }}
        >
          {err &&
            err.map((item, index) => <ErrorText key={index}>{item}</ErrorText>)}
        </View>

        {/* Sign-up button */}
        <ThemedButton
          onPress={() => signUp(username, email, password, confirmPassword)}
          size="medium"
          bordered={true}
        >
          <Text>Sign Up</Text>
        </ThemedButton>

        {/* Link to sign in */}
        <View style={{ flexDirection: "row" }}>
          <ThemedText>Have an account? </ThemedText>
          <LinkButton href="/sign-in" testID="sign-in">
            <Text style={{ color: colors.color.text }}>Sign In</Text>
          </LinkButton>
        </View>
      </KeyboardAvoidingView>
    </ThemedScreenWrapper>
  );
};

export default SignUpScreen;

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
});
