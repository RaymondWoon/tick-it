/* src/screens/Profile.screen.tsx */

// ==================================================
// Core
// ==================================================
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Spinner from "react-native-loading-spinner-overlay";
import * as Icons from "phosphor-react-native";
import { ref } from "firebase/storage";

// ==================================================
// Hook
// ==================================================
import { useThemeColors } from "#hooks/useThemeColors";

// ==================================================
// Components
// ==================================================
import ThemedScreenWrapper from "#components/themed/ScreenWrapper";
import ThemedView from "#components/themed/View";
import ThemedInput from "#components/themed/Input";
import VerticalSpacer from "#components/VerticalSpacer";
import ThemedButton from "#components/themed/Button";
import ErrorText from "#components/themed/ErrorText";
import AvatarViewer from "#components/AvatarViewer";

// ==================================================
// Context
// ==================================================
import { useAuth } from "#store/Auth.context";

// ==================================================
// Constants
// ==================================================
import { sizes, spacingY } from "#theme";

// ==================================================
// Utilities
// ==================================================
import {
  windowWidth as hScale,
  windowHeight as vScale,
} from "#utils/ScreenDimensions";
import { getProfileImage } from "#utils/Imageutils";

const ProfileScreen = () => {
  // ==================================================
  // State & Hooks
  // ==================================================
  /**
   * Username state
   * @type {[string, React.Dispatch<React.SetStateAction<string>>]}
   */
  const [username, setUsername] = useState<string>("");
  /**
   * User avatar image state from Firebase
   * @type {[string, React.Dispatch<React.SetStateAction<string>>]}
   */
  const [image, setImage] = useState<string>("");
  /**
   * State to indicate if the app is uploading the image to Firebase
   * @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]}
   */
  const [uploading, setUpLoading] = useState<boolean>(false);

  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  /* user authentication hook */
  const { user, err, updateUserProfile } = useAuth();
  /* Theme colors hook */
  const { colors } = useThemeColors();

  // ==================================================
  // Effects
  // ==================================================
  useEffect(() => {
    setUsername(user?.displayName || "");
    setImage(user?.photoURL || "default");
  }, []);

  // ==================================================
  // Handlers
  // ==================================================
  const handleImagePicker = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.canceled) {
      return;
    }

    setSelectedImage(pickerResult.assets[0].uri);
  };

  /**
   * Handles the user profile update process
   * @returns {Promise<void>}
   */
  const handleUpdateProfile = async () => {
    try {
      if (user) {
        if (selectedImage) {
          await updateUserProfile(user, username, selectedImage);
        } else {
          await updateUserProfile(user, username);
        }
      }
    } catch (error) {
      console.error("~handleUpdateProfile~ -> ", error);
      return null;
    }
  };

  // ==================================================
  // Render
  // ==================================================

  return (
    <ThemedScreenWrapper style={styles.container}>
      <Spinner visible={uploading} textContent="Uploading..." />

      {/* Avatar */}
      <ThemedView style={styles.avatarContainer}>
        <AvatarViewer
          imgSource={getProfileImage(user?.photoURL)}
          selectedImage={selectedImage}
          size={150}
          style={styles.avatar}
          testID="avatar"
        />
      </ThemedView>

      {/* Vertical Spacer */}
      <VerticalSpacer size={spacingY._15} />

      {/* Username input */}
      <ThemedInput
        icon={
          <Icons.User
            size={vScale(26)}
            color={colors.color.textSubtle}
            weight="thin"
          />
        }
        placeholder="User name"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />

      {/* Errors */}
      <View
        style={err?.length == 0 ? { display: "none" } : { display: "flex" }}
      >
        {err &&
          err.map((item, index) => <ErrorText key={index}>{item}</ErrorText>)}
      </View>

      {/* Image picker button */}
      <ThemedButton size="medium" bordered={true} onPress={handleImagePicker}>
        <Text>Pick an image</Text>
      </ThemedButton>

      {/* Update profile button */}
      <ThemedButton size="medium" bordered={true} onPress={handleUpdateProfile}>
        <Text>Update profile</Text>
      </ThemedButton>
    </ThemedScreenWrapper>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    alignItems: "center",
    gap: spacingY._15,
    paddingHorizontal: hScale(20),
  },
  avatarContainer: {
    height: vScale(200),
    alignItems: "center",
    paddingTop: vScale(20),
    backgroundColor: "transparent",
  },
  avatar: {
    width: hScale(200),
    height: vScale(200),
    borderRadius: vScale(100),
    backgroundColor: "transparent",
  },
});
