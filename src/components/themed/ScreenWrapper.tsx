/* Core */
import { StyleSheet, View, ViewStyle } from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";

/* Hooks */
import { useThemeColors } from "#hooks/useThemeColors";

type ThemedScreenWrapperProps = {
  style?: ViewStyle;
  children: React.ReactNode;
};

const ThemedScreenWrapper = ({ style, children }: ThemedScreenWrapperProps) => {
  const { colors } = useThemeColors();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.color.background },
        style,
      ]}
    >
      <StatusBar style={colors.dark ? "light" : "dark"} />
      {children}
    </View>
  );
};

export default ThemedScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
