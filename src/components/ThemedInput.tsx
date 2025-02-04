/* Core */
import { StyleSheet, TextInput, View } from "react-native";

/* Hooks */
import { useThemeColors } from "#hooks/useThemeColors";

/* Types */
import { ThemedInputProps } from "#types/Components";

/* Constants */
import { fontSizes, sizes, spacingX } from "#theme";

/* Misc */
import { windowHeight as vScale } from "#utils/ScreenDimensions";

const ThemedInput = (props: ThemedInputProps) => {
  const { colors } = useThemeColors();

  return (
    <View style={[styles.container, { borderColor: colors.color.border }]}>
      {props.icon && props.icon}
      <TextInput
        style={[{ flex: 1, color: "#fff", fontSize: vScale(14) }]}
        placeholderTextColor={colors.color.textSubtle}
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
    height: vScale(54),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,

    borderRadius: sizes._17,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._15,
    gap: spacingX._10,
  },
});
