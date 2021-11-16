import { Button } from "../components/Button";
import { Icon } from "../components/Icon";
import { useSelectThemeContext } from "./CustomThemeProvider";

export const ToggleThemeButton = (props) => {
  const { theme, setTheme } = useSelectThemeContext();

  return (
    <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")} {...props}>
      <Icon name={theme === "light" ? "faSun" : "faMoon"} />
    </Button>
  );
};
