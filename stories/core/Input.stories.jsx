import React, { useState } from "react";

import { Input } from "@finite/core/components/Input";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Core/Input",
  component: Input,
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
    <Input {...args} />
  </div>
);

const TemplateWithState = (args) => {
  const [value, setValue] = useState(args.value);

  return (
    <div style={{ padding: "1rem" }}>
      <Input
        {...args}
        value={value}
        onChange={(e) => {
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
  defaultValue: 20,
  style: { width: 150, height: 50 },
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
  value: 30,
  style: { width: 150, height: 50 },
};
