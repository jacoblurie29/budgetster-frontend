import { MONTHS_SHORTER } from "../../../util/constants/constants";
import TimeChart from "../TimeChart";
import { render } from "@testing-library/react";

const testValues = [
  100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200,
];

describe("TimeChart Tests", () => {
  const { ResizeObserver } = window;

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete window.ResizeObserver;
    window.ResizeObserver = jest.fn().mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  afterEach(() => {
    window.ResizeObserver = ResizeObserver;
    jest.restoreAllMocks();
  });

  test("correctly renders snapshot", () => {
    const component = render(<TimeChart values={testValues} width={400} />);
    expect(component).toMatchSnapshot();
  });

  test("correctly renders the time chart", () => {
    // Render the time chart
    const component = render(<TimeChart values={testValues} width={400} />);

    // Check for every value of "MONTHS_SHORTER" by getByText (single letter month abbreviations) (there are repeats)
    MONTHS_SHORTER.forEach((month) => {
      expect(component.getAllByText(month).length).toBeGreaterThan(0);
    });
  });
  test("correct renders time chart axis values", () => {
    // Render the time chart
    const component = render(<TimeChart values={testValues} width={400} />);

    // Check for every value of "MONTHS_SHORTER" by getByText (single letter month abbreviations) (there are repeats)
    expect(component.getByText("$0")).toBeTruthy();
  });

  // test line 31
  test("correctly renders the time chart when the values are negative", () => {
    // Render the time chart
    const component = render(
      <TimeChart values={testValues.map((value) => -value)} width={400} />
    );

    // Check for every value of "MONTHS_SHORTER" by getByText (single letter month abbreviations) (there are repeats)
    MONTHS_SHORTER.forEach((month) => {
      expect(component.getAllByText(month).length).toBeGreaterThan(0);
    });
  });
  test("correct renders time chart axis values when the values are negative", () => {
    // Render the time chart
    const component = render(
      <TimeChart values={testValues.map((value) => -value)} width={400} />
    );

    // Check for every value of "MONTHS_SHORTER" by getByText (single letter month abbreviations) (there are repeats)
    expect(component.getAllByText("-$300").length).toBeGreaterThan(0);
  });
});
