/* Core */
import { StyleSheet, Text as RNText, TextStyle } from "react-native";

/* Hooks */
import { useThemeColors } from "#hooks/useThemeColors";

/* Types */
import { ThemedTextProps } from "#types/Components";

/* Constants */
import { fontSizes, sizes } from "#theme";

/* Misc */
import { windowHeight as vScale } from "#utils/ScreenDimensions";

const ThemedText = ({
  size,
  color,
  type = "default",
  fontWeight = "400",
  children,
  style,
  textProps = {},
}: ThemedTextProps) => {
  const { colors } = useThemeColors();

  const textStyle: TextStyle = {
    fontSize: size ? vScale(size) : vScale(18),
    color:
      color || (type == "link" ? colors.color.btnTextRed : colors.color.text),
    fontWeight,
  };

  return (
    <RNText
      style={[
        textStyle,
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "semiBold" ? styles.semiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...textProps}
    >
      {children}
    </RNText>
  );
};

export default ThemedText;

const styles = StyleSheet.create({
  default: {
    fontSize: fontSizes.FONT16,
    lineHeight: sizes._24,
  },
  semiBold: {
    fontSize: fontSizes.FONT16,
    lineHeight: sizes._24,
    fontWeight: "600",
  },
  title: {
    fontSize: fontSizes.FONT32,
    fontWeight: "bold",
    lineHeight: sizes._32,
  },
  subtitle: {
    fontSize: fontSizes.FONT20,
    fontWeight: "bold",
  },
  link: {
    fontSize: fontSizes.FONT16,
    lineHeight: sizes._30,
  },
});
