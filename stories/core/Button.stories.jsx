import React from "react";

import { Button } from "@finite/core/components/Button";
import { Grid } from "@finite/core/components/Grid";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Core/Button",
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => (
  <div style={{ padding: "1rem" }}>
    <Button {...args} />
  </div>
);

const WrappedButton = (props) => {
  return <Button {...props}>button</Button>;
};

const SummaryComponent = (args) => {
  return (
    <Grid columns={7} style={{ padding: "1rem" }}>
      <div></div>
      <div>default</div>
      <div>primary</div>
      <div>secondary</div>
      <div>success</div>
      <div>warning</div>
      <div>danger</div>

      <div>Base</div>
      <WrappedButton />
      <WrappedButton primary />
      <WrappedButton secondary />
      <WrappedButton success />
      <WrappedButton warning />
      <WrappedButton danger />

      <div>Bordered</div>
      <WrappedButton bordered />
      <WrappedButton primary bordered />
      <WrappedButton secondary bordered />
      <WrappedButton success bordered />
      <WrappedButton warning bordered />
      <WrappedButton danger bordered />

      <div>Inactive</div>
      <WrappedButton inactive />
      <WrappedButton primary inactive />
      <WrappedButton secondary inactive />
      <WrappedButton success inactive />
      <WrappedButton warning inactive />
      <WrappedButton danger inactive />

      <div>Inactive, bordered</div>
      <WrappedButton inactive bordered />
      <WrappedButton primary inactive bordered />
      <WrappedButton secondary inactive bordered />
      <WrappedButton success inactive bordered />
      <WrappedButton warning inactive bordered />
      <WrappedButton danger inactive bordered />

      <div>Disabled</div>
      <WrappedButton disabled />
      <WrappedButton primary disabled />
      <WrappedButton secondary disabled />
      <WrappedButton success disabled />
      <WrappedButton warning disabled />
      <WrappedButton danger disabled />

      <div>Disabled bordered</div>
      <WrappedButton disabled bordered />
      <WrappedButton primary disabled bordered />
      <WrappedButton secondary disabled bordered />
      <WrappedButton success disabled bordered />
      <WrappedButton warning disabled bordered />
      <WrappedButton danger disabled bordered />

      <div>Disabled inactive</div>
      <WrappedButton disabled inactive />
      <WrappedButton primary disabled inactive />
      <WrappedButton secondary disabled inactive />
      <WrappedButton success disabled inactive />
      <WrappedButton warning disabled inactive />
      <WrappedButton danger disabled inactive />

      <div>Disabled inactive bordered</div>
      <WrappedButton disabled inactive bordered />
      <WrappedButton primary disabled inactive bordered />
      <WrappedButton secondary disabled inactive bordered />
      <WrappedButton success disabled inactive bordered />
      <WrappedButton warning disabled inactive bordered />
      <WrappedButton danger disabled inactive bordered />
    </Grid>
  );
};

export const Summary = SummaryComponent.bind({});

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Base.args = {
  children: "Button",
  style: { width: 150, height: 50 },
};

export const Success = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Success.args = {
  success: true,
  children: "Button",
  style: { width: 150, height: 50 },
};

export const White = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
White.args = {
  white: true,
  children: "Button",
  style: { width: 150, height: 50 },
};

export const Secondary = Template.bind({});
Secondary.args = {
  secondary: true,
  children: "Button",
  style: { width: 150, height: 50 },
};
