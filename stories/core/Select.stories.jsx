import React, { useEffect, useState } from "react";

import { Select } from "@finite/core/components/Select";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Core/Select",
  component: Select,
  argTypes: {
    value: {
      control: {
        disable: true,
      },
    },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => (
  <div style={{ padding: "1rem" }}>
    <Select {...args} />
  </div>
);

const TemplateWithState = (args) => {
  const [value, setValue] = useState(args.value);

  return (
    <div style={{ padding: "1rem" }}>
      <Select
        {...args}
        value={value}
        onChange={(e) => {
          console.log(e);
          args.onChange(e);
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export const Uncontrolled = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Uncontrolled.args = {
  defaultValue: "a",
  style: { width: 150, height: 50 },
  options: ["a", "b", "c"],
};

Uncontrolled.argTypes = {
  value: {
    table: {
      disable: true,
    },
  },
};

export const Controlled = TemplateWithState.bind({});
Controlled.args = {
  primary: true,
  value: "a",
  options: ["a", "b", "c"],
  style: { width: 150, height: 50 },
};
