/* Core */
import {
  Dimensions,
  StyleSheet,
  Text,
  TextStyle,
  TextProps,
  View,
} from "react-native";

/* Hooks */
import { useThemeColors } from "#hooks/useThemeColors";

/* Constants */
import { fontSizes, sizes } from "#theme";

/* Misc */
import { windowHeight as vScale } from "#utils/ScreenDimensions";

type ErrorTextProps = {
  children: any | null;
  style?: TextStyle;
  textProps?: TextProps;
};

const ErrorText = ({ children, style, textProps }: ErrorTextProps) => {
  const { colors } = useThemeColors();

  return (
    <View style={styles.container}>
      <Text
        style={[
          { color: colors.color.textRed, fontSize: fontSizes.FONT16 },
          style,
        ]}
        {...textProps}
      >
        {children}
      </Text>
    </View>
  );
};

export default ErrorText;

const styles = StyleSheet.create({
  container: {
    maxWidth: Dimensions.get("screen").width * 0.8,
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: vScale(4),
  },
});
