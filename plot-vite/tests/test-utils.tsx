import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { RenderOptions, render as rtlRender } from "@testing-library/react";
import { ReactElement } from "react";

function render(ui: ReactElement, renderOptions: RenderOptions = {}) {
  const user = userEvent.setup();

  return { userEvent: user, ...rtlRender(ui, { ...renderOptions }) };
}

// We re-export everything
export * from "@testing-library/react";
// And override the `render` method
export { render };
