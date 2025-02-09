/* src/components/themed/TabHeader.tsx */

// ==================================================
// Core
// ==================================================
import { StyleSheet, Text, View } from "react-native";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// ==================================================
// Hooks
// ==================================================
import { useThemeColors } from "#hooks/useThemeColors";

// ==================================================
// Components
// ==================================================
import AvatarViewer from "#components/AvatarViewer";
import VerticalSpacer from "#components/VerticalSpacer";

// ==================================================
// Context
// ==================================================
import { useAuth } from "#store/Auth.context";

// ==================================================
// Constants
// ==================================================
import { sizes, spacingX } from "#theme";

// ==================================================
// Utilities
// ==================================================
import {
  windowHeight as vScale,
  windowWidth as hScale,
} from "#utils/ScreenDimensions";
import { getProfileImage } from "#utils/Imageutils";

// ==================================================
// Assets
// ==================================================
import { AvatarImg } from "#theme/Images";

type TabHeaderProps = {
  children: ReactNode;
  bg?: string;
  onPressLeft?: () => void;
};

const TabHeader = ({ children, bg, onPressLeft }: TabHeaderProps) => {
  // ==================================================
  // State & Hooks
  // ==================================================

  /**
   * User avatar image state from Firebase
   * @type {[string, React.Dispatch<React.SetStateAction<string>>]}
   */
  //const [image, setImage] = useState<string>("");

  /* provides access to navigation routes */
  const router = useRouter();
  /* user authentication hook */
  const { user, signOut } = useAuth();
  /* Theme colors hook */
  const { colors } = useThemeColors();

  // ==================================================
  // Effects
  // ==================================================
  //   useEffect(() => {
  //     setImage(user?.photoURL || "default");
  //   }, []);

  // ==================================================
  // Handlers
  // ==================================================

  /**
   * Handles the user profile update process
   * @returns {Promise<void>}
   */
  const handleSignOut = async () => {
    await signOut();

    router.replace("/sign-in");
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: bg || colors.color.background },
      ]}
    >
      {/* Drawer hamburger icon */}
      <View style={styles.drawerIconContainer}>
        <VerticalSpacer size={vScale(20)} />
        <View style={{ justifyContent: "flex-end" }}>
          <Ionicons
            name="menu"
            onPress={onPressLeft}
            size={hScale(24)}
            color={"#000"}
          />
        </View>
      </View>

      <View style={styles.avatarContainer}>
        {/* Avatar */}
        <View>
          <AvatarViewer
            imgSource={getProfileImage(user?.photoURL)}
            size={50}
            testID="avatar"
          />
        </View>

        {/* Children */}
        <View style={styles.childrenContainer}>{children}</View>

        {/* Logout and notification icons */}
        <View style={styles.miscContainer}>
          <View style={styles.miscIconContainer}>
            <Ionicons
              name="log-out-outline"
              onPress={handleSignOut}
              size={hScale(24)}
              color={"#000"}
            />
          </View>
          <View style={styles.miscIconContainer}>
            <Ionicons
              name="notifications-outline"
              size={hScale(24)}
              color={"#000"}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default TabHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: hScale(10),
    paddingTop: vScale(5),
    paddingBottom: vScale(5),
    alignItems: "center",
  },
  drawerIconContainer: {
    flexDirection: "column",
    padding: 0,
    width: hScale(30),
  },
  avatarContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  childrenContainer: {
    flex: 1,
    paddingLeft: spacingX._15,
    justifyContent: "center",
  },
  miscContainer: {
    flexDirection: "column",
    width: 30,
    paddingTop: 0,
  },
  miscIconContainer: {
    alignItems: "center",
    paddingVertical: vScale(3),
  },
});
