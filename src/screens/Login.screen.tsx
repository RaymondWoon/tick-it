/* Core */
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import { Ionicons } from "@expo/vector-icons";

/* Hooks */

/* Components */
import ThemedScreenWrapper from "#components/themed/ScreenWrapper";
import ThemedView from "#components/themed/View";
import ThemedText from "#components/themed/Text";
import ThemedInput from "#components/themed/Input";
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

const LoginScreen = () => {
  /* state to manage email input */
  const [email, setEmail] = useState<string>("");
  /* state to manage password input */
  const [password, setPassword] = useState<string>("");
  /* state to toggle password visibility */
  const [showPassword, setShowPassword] = useState<boolean>(false);

  /* Auth hook */
  const auth = useAuth();
  /* Theme colors hook */
  const { colors } = useThemeColors();

  const { theme, setTheme } = useCustomTheme();

  const router = useRouter();

  /* Toggle the visibility of the password input */
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
            auth.onLogin(email, password)
          }
          size="medium"
          bordered={true}
        >
          <Text>Sign-in</Text>
        </ThemedButton>

        <View style={{ flexDirection: "row" }}>
          <ThemedText>Don't have an account? </ThemedText>
          <LinkButton href="/register">
            <Text style={{ color: colors.color.text }}>Sign-up</Text>
          </LinkButton>
        </View>

        <ScrollView style={{ backgroundColor: colors.color.background }}>
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
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedScreenWrapper>
  );
};

export default LoginScreen;

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
