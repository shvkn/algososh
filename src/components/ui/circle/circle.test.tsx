import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types";

describe("Circle", () => {
  it("Should render without prop `letter` properly", () => {
    const tree = renderer.create(<Circle />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Should render with prop `letter` properly", () => {
    const tree = renderer.create(<Circle letter={"ABC"} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Should render with text at prop `head` properly", () => {
    const tree = renderer.create(<Circle letter={"A"} head={"B"} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Should render with React.Component at prop `head` properly", () => {
    const tree = renderer
      .create(<Circle letter={"A"} head={<Circle letter={"B"} isSmall={true} />} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Should render with text at prop `tail` properly", () => {
    const tree = renderer.create(<Circle letter={"A"} tail={"B"} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Should render with React.Component at prop `tail` properly", () => {
    const tree = renderer
      .create(<Circle letter={"A"} tail={<Circle letter={"B"} isSmall={true} />} />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Should render with prop `index` properly", () => {
    const tree = renderer.create(<Circle letter={"A"} index={0} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Should render Circle with prop `isSmall` properly", () => {
    const tree = renderer.create(<Circle letter={"A"} isSmall={true} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Should render Circle with state `Default` properly", () => {
    const tree = renderer.create(<Circle letter={"A"} state={ElementStates.Default} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Should render Circle with state `Changing` properly", () => {
    const tree = renderer.create(<Circle letter={"A"} state={ElementStates.Changing} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Should render Circle with state `Modified` properly", () => {
    const tree = renderer.create(<Circle letter={"A"} state={ElementStates.Modified} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
