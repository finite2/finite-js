import React, { useEffect, useState } from "react";

import { DateSelect } from "@finite/core/components/DateSelect";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Core/DateSelect",
  component: DateSelect,
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
    <DateSelect {...args} />
  </div>
);

const TemplateWithState = (args) => {
  const [value, setValue] = useState(args.value);

  return (
    <div style={{ padding: "1rem" }}>
      <DateSelect
        {...args}
        value={value}
        onChange={(date) => {
          console.log(date);
          args.onChange(date);
          setValue(date);
        }}
      />
    </div>
  );
};

export const Uncontrolled = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Uncontrolled.args = {
  defaultValue: new Date(),
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
  value: new Date(),
  style: { width: 150, height: 50 },
};
