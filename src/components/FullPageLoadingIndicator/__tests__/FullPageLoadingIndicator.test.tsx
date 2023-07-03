import FullPageLoadingIndicator from "../FullPageLoadingIndicator";
import { render } from "@testing-library/react";

describe("FullPageLoadingIndicator Tests", () => {
  test("correctly renders snapshot", () => {
    const component = render(<FullPageLoadingIndicator />);
    expect(component).toMatchSnapshot();
  });
  test("correctly renders the full page loading indicator", () => {
    // Render the full page loading indicator
    const component = render(<FullPageLoadingIndicator />);
    // Obtain the full page loading indicator by its testId
    const fullPageLoadingIndicator = component.getByTestId(
      "fullpageloadingindicator-testId"
    );
    expect(fullPageLoadingIndicator).toBeTruthy();
  });
  test("correctly renders the full page loading indicator with a custom title", () => {
    // Render the full page loading indicator
    const component = render(
      <FullPageLoadingIndicator title={"Custom Title"} />
    );
    // Obtain the full page loading indicator by its testId
    const fullPageLoadingIndicator = component.getByTestId(
      "fullpageloadingindicator-testId"
    );
    // Check that the title is rendered correctly
    expect(fullPageLoadingIndicator.children[1].innerHTML).toBe("Custom Title");
  });
});
