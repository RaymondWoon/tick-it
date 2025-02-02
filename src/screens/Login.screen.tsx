/* Core */
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

/* Hooks */

/* Components */

/* Types */

/* Context */

/* Constants */

/* Styles */

/* Misc */

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
  const { theme, setTheme } = useCustomTheme();
  const { colors } = useThemeColors();

  return (
    <ScrollView style={{ backgroundColor: colors.color.background }}>
      <Image source={LogoImg} style={styles.logo} role="img" alt="logo" />
      <Text style={[styles.title, { color: colors.color.text }]}>Tick-it</Text>
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
      {Themes.map((key, index) => (
        <React.Fragment key={key}>
          <ThemeRow onPress={() => setTheme(key)} checked={theme === key}>
            {key}
          </ThemeRow>
          {index !== Themes.length - 1 && <Border />}
        </React.Fragment>
      ))}
    </ScrollView>
  );
};

export default LoginScreen;

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
