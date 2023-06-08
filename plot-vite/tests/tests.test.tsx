import { render } from "./test-utils";

describe("tests work", () => {
  test("yes", () => {
    const { container } = render(<div>Hello world</div>);

    expect(container.firstChild).toMatchSnapshot();
  });
});
