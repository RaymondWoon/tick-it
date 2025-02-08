/* src/components/AvatarViewer.tsx */

// ==================================================
// Core
// ==================================================
import { Image, ImageStyle, type ImageSource } from "expo-image";

// ==================================================
// Utilities
// ==================================================
import {
  windowWidth as hScale,
  windowHeight as vScale,
} from "#utils/ScreenDimensions";

// ==================================================
// Types & Interfaces
// ==================================================
type AvatarViewerProps = {
  imgSource: ImageSource;
  size: number;
  selectedImage?: string;
  style?: ImageStyle;
  testID?: string;
};

const AvatarViewer = ({
  imgSource,
  size,
  selectedImage,
  style,
  testID,
}: AvatarViewerProps) => {
  /* Use user selected image if provided, otherwise the image source */
  const imageSource = selectedImage ? { uri: selectedImage } : imgSource;

  // ==================================================
  // Render
  // ==================================================

  return (
    <Image
      source={imageSource}
      style={[
        {
          width: hScale(size),
          height: vScale(size),
          borderRadius: hScale(size) * 0.5,
        },
        style,
      ]}
      testID={testID}
    />
  );
};

export default AvatarViewer;
