/* Core */
import { StyleSheet, TextStyle } from "react-native";
import { Link } from "expo-router";

/* Misc */
import {
  windowHeight as vScale,
  windowWidth as hScale,
} from "#utils/ScreenDimensions";

type LinkButtonProps = {
  href: string | "/";
  children: any | null;
  style?: TextStyle;
  testID?: string;
};

const LinkButton = ({ href, children, style, testID }: LinkButtonProps) => {
  return (
    <Link style={[styles.button, style]} href={href} testID={testID}>
      {children}
    </Link>
  );
};

export default LinkButton;

const styles = StyleSheet.create({
  button: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: vScale(5),
    padding: hScale(2),
    marginLeft: hScale(5),
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
