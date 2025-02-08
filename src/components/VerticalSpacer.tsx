/* src/components/AvatarViewer.tsx */

// ==================================================
// Core
// ==================================================
import { View as RNView, ViewStyle } from "react-native";

// ==================================================
// Hooks
// ==================================================
import { useThemeColors } from "#hooks/useThemeColors";

// ==================================================
// Types & Interfaces
// ==================================================
type VerticalSpacerProps = {
  size: number;
  bg?: string;
};

const VerticalSpacer = ({ size, bg }: VerticalSpacerProps) => {
  /* Theme colors hook */
  const { colors } = useThemeColors();

  // ==================================================
  // Render
  // ==================================================

  return (
    <RNView
      style={[{ height: size, backgroundColor: bg || colors.color.background }]}
    ></RNView>
  );
};

export default VerticalSpacer;
