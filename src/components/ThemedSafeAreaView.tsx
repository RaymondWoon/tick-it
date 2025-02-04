/* Core */
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

/* Hooks */
import { useThemeColors } from "#hooks/useThemeColors";

/* Types */
import { ThemedSafeAreaViewProps } from "#types/Components";

const ThemedSafeAreaView = ({ style, children }: ThemedSafeAreaViewProps) => {
  const { colors } = useThemeColors();

  return (
    <RNSafeAreaView
      style={[style, { flex: 1, backgroundColor: colors.color.background }]}
    >
      <StatusBar style={colors.dark ? "light" : "dark"} />
      {children}
    </RNSafeAreaView>
  );
};

export default ThemedSafeAreaView;
