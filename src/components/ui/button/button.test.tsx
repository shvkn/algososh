import { fireEvent, render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";

import { Button } from "./button"

describe("Button", () => {
  it("Should render button with Text properly", () => {
    const tree = renderer.create(<Button text={"Click me"} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Should render button without Text properly", () => {
    const tree = renderer.create(<Button />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Should render Disabled button properly", () => {
    const tree = renderer.create(<Button disabled={true} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Should render button with Loader properly", () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Should react on Click event", () => {
    const mockCallback = jest.fn();
    render(<Button text={"Click me"} onClick={mockCallback} />);

    fireEvent.click(screen.getByText(/click me/i));

    expect(mockCallback.mock.calls.length).toBe(1);
  });

  it("Shouldn't react on Click event", () => {
    const mockCallback = jest.fn();
    render(<Button text={"Click me"} onClick={mockCallback} disabled={true} />);

    fireEvent.click(screen.getByText(/click me/i));

    expect(mockCallback.mock.calls.length).toBe(0);
  });
});
