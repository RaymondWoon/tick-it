/* Core */
import { ReactNode } from "react";
import {
  TextInput,
  TextProps,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from "react-native";

export type ThemedSafeAreaViewProps = {
  style?: ViewStyle;
  children: ReactNode;
};

export type ThemedViewProps = {
  style?: ViewStyle;
  children: ReactNode;
  bg?: string;
};

export type ThemedTextProps = {
  size?: number;
  color?: string;
  type: "default" | "title" | "semiBold" | "subtitle" | "link";
  fontWeight?: TextStyle["fontWeight"];
  children: any | null;
  style?: TextStyle;
  textProps?: TextProps;
};

export interface ThemedInputProps extends TextInputProps {
  icon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  inputRef?: React.RefObject<TextInput>;
}
