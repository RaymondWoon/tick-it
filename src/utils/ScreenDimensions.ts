/* Core */
import { Dimensions, DimensionValue, PixelRatio, Platform } from "react-native";

export const SCREEN_HEIGHT = Dimensions.get("window").height;
export const SCREEN_WIDTH = Dimensions.get("window").width;

export const IsIOS = Platform.OS === "ios";
export const IsAndroid = Platform.OS === "android";

// const wHeight = Dimensions.get("screen").height;
// const wWidth = Dimensions.get("screen").width;
// console.log("Width -> ", wWidth);
// console.log("Height -> ", wHeight);

/* Samsung S21FE: width: 360, height: 699 */
export const windowHeight = (height: DimensionValue): number => {
  if (!height) {
    return 0;
  }
  let tempHeight = SCREEN_HEIGHT * (parseFloat(height.toString()) / 699);
  return PixelRatio.roundToNearestPixel(tempHeight);
};

export const windowWidth = (width: DimensionValue): number => {
  if (!width) {
    return 0;
  }
  let tempWidth = SCREEN_WIDTH * (parseFloat(width.toString()) / 360);
  return PixelRatio.roundToNearestPixel(tempWidth);
};
