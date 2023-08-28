import InitialsCircle from "../InitialsCircle";
import { render } from "@testing-library/react";

describe("InitialsCircle", () => {
  test("should render initials", () => {
    const component = render(<InitialsCircle initials={"JL"} />);
    expect(component.getByText("JL")).toBeTruthy();
  });

  test("should render initials with variant", () => {
    const component = render(
      <InitialsCircle initials={"JL"} variant={"large"} />
    );
    expect(component.getByText("JL")).toBeTruthy();
  });

  test("should render initials with variant and background color", () => {
    const component = render(
      <InitialsCircle
        initials={"JL"}
        variant={"large"}
        backgroundColor={"#AAAAAA"}
      />
    );
    expect(component.getByText("JL")).toBeTruthy();

    const style = window.getComputedStyle(component.getByText("JL"));
    expect(style.backgroundColor).toBe("rgb(170, 170, 170)");
  });

  test("should render initials snapshot", () => {
    const component = render(<InitialsCircle initials={"JL"} />);
    expect(component).toMatchSnapshot();
  });
});
