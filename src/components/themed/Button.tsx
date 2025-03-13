/* Core */
import { ReactNode } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";

/* Hooks */
import { useThemeColors } from "#hooks/useThemeColors";

/* Constants */
import { sizes } from "#theme";

/* Misc */
import {
  windowHeight as vScale,
  windowWidth as hScale,
} from "#utils/ScreenDimensions";

interface ThemedButtonProps extends TouchableOpacityProps {
  style?: ViewStyle;
  size?: "large" | "medium" | "small";
  type?: "filled" | "outlined";
  bordered?: boolean;
  onPress?: () => void;
  loading?: boolean;
  textStyle?: TextStyle;
  testID?: string | undefined;
  children: ReactNode;
}

const width = Dimensions.get("window").width;

const ThemedButton = ({
  style,
  size = "large",
  type = "filled",
  bordered = false,
  onPress,
  loading = false,
  textStyle,
  testID,
  children,
}: ThemedButtonProps) => {
  const { colors } = useThemeColors();

  /* Button sizes */
  const btnLarge = hScale(width / 1.2);
  const btnMedium = hScale(width / 1.6);
  const btnSmall = hScale(width / 2);

  const btnSize =
    size === "large" ? btnLarge : size === "medium" ? btnMedium : btnSmall;

  const bg = type === "filled" ? colors.color.btnBgGreen : "transparent";

  const borderRad = bordered ? sizes._16 : sizes._6;

  const borderStyle = type === "outlined" && {
    borderColor: colors.color.border,
    borderWidth: 2,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style]}
      testID={testID}
    >
      <View
        style={[
          styles.button,
          borderStyle,
          { width: btnSize, backgroundColor: bg, borderRadius: borderRad },
          style,
        ]}
      >
        <Text style={[styles.text, { color: colors.color.btnText }]}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
  button: {
    borderCurve: "continuous",
    height: vScale(48),
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: vScale(20),
  },
});
