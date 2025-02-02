/* Hooks */
import { useCustomTheme } from "#context/Theme.context";

/* Constants */
import Colors from "#theme/Colors";

/* define the useThemeColors hook */
/**
 * useThemeColors hook
 *
 * @returns
 * <string> theme: the name of the current theme
 * <boolean> isDark: if the theme is dark or light
 * <object> colors: the colors assigned to different elements of the theme
 */
export function useThemeColors() {
  /* initialize hook */
  const customTheme = useCustomTheme();

  /* get the current theme */
  const currentTheme = customTheme.theme;

  return {
    theme: currentTheme,
    isDark: customTheme.isDark,
    colors: Colors[currentTheme],
  };
}
