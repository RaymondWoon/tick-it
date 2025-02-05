/* Core */
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

/* Hooks */
import { useThemeColors } from "#hooks/useThemeColors";

/* Types */
//import { ThemedInputProps } from "#types/Components";

/* Constants */
import { fontSizes, sizes, spacingX } from "#theme";

/* Misc */
import { windowHeight as vScale } from "#utils/ScreenDimensions";

interface ThemedInputProps extends TextInputProps {
  icon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  inputRef?: React.RefObject<RNTextInput>;
}

const ThemedInput = (props: ThemedInputProps) => {
  const { colors } = useThemeColors();

  return (
    <View style={[styles.container, { borderColor: colors.color.border }]}>
      {props.icon && props.icon}
      <RNTextInput
        style={[
          { flex: 1, color: colors.color.text, fontSize: fontSizes.FONT18 },
        ]}
        // placeholderTextColor={colors.color.textSubtle}
        placeholderTextColor="#aaa"
        ref={props.inputRef && props.inputRef}
        {...props}
      />
    </View>
  );
};

export default ThemedInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: vScale(44),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: sizes._16,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._15,
    gap: spacingX._10,
  },
});
