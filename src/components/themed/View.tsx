/* Core */
import { ReactNode } from "react";
import { View as RNView, ViewStyle } from "react-native";

/* Hooks */
import { useThemeColors } from "#hooks/useThemeColors";

/* Types */
//import { ThemedViewProps } from "#types/Components";

type ThemedViewProps = {
  style?: ViewStyle;
  children: ReactNode;
  bg?: string;
};

const ThemedView = ({ style, children, bg }: ThemedViewProps) => {
  const { colors } = useThemeColors();

  return (
    <RNView style={[style, { backgroundColor: bg || colors.color.background }]}>
      {children}
    </RNView>
  );
};

export default ThemedView;
