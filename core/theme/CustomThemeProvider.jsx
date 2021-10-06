import { createContext, useCallback, useState, useContext, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./darkTheme";
import { lightTheme } from "./lightTheme";

const SelectTheme = createContext({
  theme: "",
  setTheme: () => null,
});

// TODO avoid having these contained here so can be reused without any reference to these themes
const available_themes = {
  light: lightTheme,
  dark: darkTheme,
};

export const THEME = {
  DARK: "dark",
  LIGHT: "light",
};

export const useSelectThemeContext = () => useContext(SelectTheme);

export const CustomThemeProvider = ({ children, initTheme, themes }) => {
  const [theme, _setTheme] = useState(initTheme);

  useEffect(() => {
    if (themes[initTheme] && theme !== initTheme) {
      _setTheme(initTheme);
    }
  }, [initTheme]);

  const setTheme = useCallback(
    (_theme) => {
      if (themes[_theme]) {
        _setTheme(_theme);
      }
    },
    [_setTheme]
  );

  return (
    <ThemeProvider theme={themes[theme]}>
      <SelectTheme.Provider value={{ theme, setTheme }}>{children}</SelectTheme.Provider>
    </ThemeProvider>
  );
};

CustomThemeProvider.defaultProps = {
  initTheme: THEME.DARK,
  themes: available_themes,
};
