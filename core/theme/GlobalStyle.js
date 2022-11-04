import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle(
  ({ theme }) => `

  /* css avaiable variables */
  :root {
    
    --color-default: ${theme.colors.default};
    --color-default-dark:  ${theme.colors.defaultDark};

    --color-primary: ${theme.colors.primary};
    --color-primary-dark: ${theme.colors.primaryDark};
    --color-primary-light: ${theme.colors.primaryLight};

    --color-secondary: ${theme.colors.secondary};
    --color-secondary-dark: ${theme.colors.secondaryDark};
    --color-secondary-light: ${theme.colors.secondaryLight};

    --color-background: ${theme.colors.background};
    --color-background-alt: ${theme.colors.backgroundAlt};

    --color-font: ${theme.colors.fontMain}; 
    --color-font-alt: ${theme.colors.fontAlt};
    --color-font-selected: ${theme.colors.fontSelected};
    --color-font-disabled: ${theme.colors.fontDisabled};

    --color-success: ${theme.colors.success};
    --color-success-dark:  ${theme.colors.successDark};

    --color-warning: ${theme.colors.warning};
    --color-warning-dark:  ${theme.colors.warningDark};

    --color-danger: ${theme.colors.danger};
    --color-danger-dark:  ${theme.colors.dangerDark};

    --button-radius: ${theme.button.radius};
    --button-bordered: ${theme.button.bordered};

    --figure-padding: 20px;
    --figure-padding-inner: 10px;
    --figure-border-radius: 25px;
    --figure-border-radius-inner: 5px;

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
