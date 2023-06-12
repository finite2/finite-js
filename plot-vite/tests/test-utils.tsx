import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { RenderOptions, render as rtlRender } from "@testing-library/react";
import { ReactElement } from "react";

function render(ui: ReactElement, renderOptions: RenderOptions = {}) {
  const user = userEvent.setup();

  return { userEvent: user, ...rtlRender(ui, { ...renderOptions }) };
}

export const renderTest = (renderObject: { [key: string]: () => JSX.Element }) => {
  Object.entries(renderObject).forEach(([name, Example]) => {
    test(`${name} renders`, () => {
      const { container } = render(<Example />);

      expect(container.firstChild).toMatchSnapshot();
    });
  });
};

// We re-export everything
export * from "@testing-library/react";
// And override the `render` method
export { render };
