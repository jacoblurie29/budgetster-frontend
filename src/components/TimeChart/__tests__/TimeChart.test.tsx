import { MONTHS_SHORTER } from "../../../util/constants/constants";
import TimeChart from "../TimeChart";
import { render } from "@testing-library/react";

const testValues = [
  100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200,
];

describe("TimeChart Tests", () => {
  test("correctly renders snapshot", () => {
    const component = render(<TimeChart values={testValues} />);
    expect(component).toMatchSnapshot();
  });

  test("correctly renders the time chart", () => {
    // Render the time chart
    const component = render(<TimeChart values={testValues} />);

    // Check for every value of "MONTHS_SHORTER" by getByText (single letter month abbreviations) (there are repeats)
    MONTHS_SHORTER.forEach((month) => {
      expect(component.getAllByText(month).length).toBeGreaterThan(0);
    });
  });
});
