import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle(
  ({ theme }) => `

  /* css avaiable variables */
  :root {
    --color-primary: ${theme.colors.primary};
    --color-primary-dark: ${theme.colors.primaryDark};
    --color-primary-light: ${theme.colors.primaryLight};

    --color-background: ${theme.colors.background};
    --color-background-alt: ${theme.colors.backgroundAlt};

    --color-font: ${theme.colors.fontMain}; 
    --color-font-alt: ${theme.colors.fontAlt};
    --color-font-selected: ${theme.colors.fontSelected};
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: var(--color-background);
    color: var(--color-font);

    transition: 0.25s ease-in-out;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }

  .center {
    text-align: center;
  }

  a {
    color: var(--color-font-selected);
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }

  div {
    box-sizing: border-box;
  }

  // storybook theming
  .docs-story {
    background: var(--color-background);
  }
`
);
