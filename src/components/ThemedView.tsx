/* Core */
import { View as RNView, ViewProps } from "react-native";

/* Hooks */
import { useThemeColors } from "#hooks/useThemeColors";

/* Types */
import { ThemedViewProps } from "#types/Components";

const ThemedView = ({ style, children, bg }: ThemedViewProps) => {
  const { colors } = useThemeColors();

  return (
    <RNView style={[style, { backgroundColor: bg || colors.color.background }]}>
      {children}
    </RNView>
  );
};

export default ThemedView;
