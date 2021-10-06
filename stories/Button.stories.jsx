import React from "react";

import { Button } from "../core/components/Button";
import { THEME } from "../core/theme/CustomThemeProvider";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Core/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    theme: {
      options: [THEME.LIGHT, THEME.DARK],
      control: { type: "select" },
    },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  children: "Button",
  style: { width: 150, height: 50 },
  theme: THEME.DARK,
};

export const Secondary = Template.bind({});
Secondary.args = {
  secondary: true,
  children: "Button",
  style: { width: 150, height: 50 },
};
