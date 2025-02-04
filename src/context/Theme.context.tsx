/* Core */
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// react-navigation default themes and provider
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";

import merge from "deepmerge";

/* Hooks */
import { useColorScheme } from "#hooks/useColorScheme";

/* Constants */
import themes from "#theme/Colors";

export const Themes: ITheme[] = ["light", "dark", "forest"];
export type ITheme = "light" | "dark" | "forest";

type IThemeContext = {
  theme: ITheme;
  setTheme: (theme: ITheme) => void;
  loading: boolean;
};

/**
 * ThemeContext to be accessible throughout the entire app
 * Accessible via the useCustomTheme hook below
 */
const ThemeContext = createContext<IThemeContext>({
  theme: "light",
  setTheme: () => {},
  loading: true,
});

type ThemeProviderProps = {
  children: React.ReactNode;
};

/**
 * Provides the variables and functions accessible via the context
 * @param {children}  : all contained components
 * @returns an theme wrapper for all children components
 */
export const CustomThemeProvider = ({ children }: ThemeProviderProps) => {
  /* obtain the system color scheme light/dark */
  const systemTheme = useColorScheme();

  /* state variable and method for the app theme */
  const [theme, setTheme] = useState<ITheme>(systemTheme);
  /* flag to determine if the app is waiting on a response */
  const [loading, setLoading] = useState(true);

  /* detect if the user had saved a custom theme and use it */
  useEffect(() => {
    AsyncStorage.getItem("@tick_it_theme")
      .then((storedTheme) => {
        if (storedTheme) {
          setTheme(storedTheme as ITheme);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  /* save the last used theme locally for reuse */
  useEffect(() => {
    AsyncStorage.setItem("@tick_it_theme", theme);
  }, [theme]);

  /* update the react-navigation 'default' theme colours */
  const navigationTheme = themes[theme].dark
    ? merge(NavigationDarkTheme, themes[theme])
    : merge(NavigationDefaultTheme, themes[theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, loading }}>
      <NavigationThemeProvider value={navigationTheme}>
        {children}
      </NavigationThemeProvider>
    </ThemeContext.Provider>
  );
};

/* define the useCustomTheme hook */
/**
 * The hook to provive access to the ThemeContext
 * @returns variables and methods as defined by the context
 */
export const useCustomTheme = () => {
  const ctx = useContext(ThemeContext);

  return {
    isDark: false,
    theme: ctx.theme,
    setTheme: ctx.setTheme,
    loading: ctx.loading,
  };
};
