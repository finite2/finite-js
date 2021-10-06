import React from "react";
import { CustomThemeProvider, THEME } from "../core/theme/CustomThemeProvider";
import { GlobalStyle } from "../core/theme/GlobalStyle";

import { themes } from "@storybook/theming";

export const parameters = {
  layout: "fullscreen",
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark, appBg: "black" },
    // Override the default light theme
    light: { ...themes.normal, appBg: "white" },
  },
};

export const decorators = [
  (Story, { globals }) => {
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <CustomThemeProvider initTheme={globals.theme}>
          <GlobalStyle />
          <Story />
        </CustomThemeProvider>
      </div>
    );
  },
];

// export const args = {
//   theme: THEME.DARK,
// };

// export const argTypes = {
//   theme: {
//     options: ["primary", "secondary"],
//   },
// };

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Global theme for components",
    defaultValue: THEME.DARK,
    toolbar: {
      icon: "circlehollow",
      // Array of plain string values or MenuItem shape (see below)
      items: [THEME.LIGHT, THEME.DARK],
      // Property that specifies if the name of the item will be displayed
      showName: true,
    },
  },
};
