import LargeCountCard from "../LargeCountCard";
import { render } from "@testing-library/react";

describe("LargeCountCard Tests", () => {
  test("correctly renders snapshot", () => {
    const component = render(
      <LargeCountCard title="Test Title" value={100} subtitle="Test Subtitle" />
    );
    expect(component).toMatchSnapshot();
  });
  test("correctly renders the large count card without a positive or negative sign", () => {
    // Render the large count card
    const component = render(
      <LargeCountCard title="Test Title" value={100} subtitle="Test Subtitle" />
    );
    // Check for the title, value, and subtitle
    expect(component.getByText("Test Title")).toBeTruthy();
    expect(component.getByText("$100")).toBeTruthy();
    expect(component.getByText("Test Subtitle")).toBeTruthy();
  });
  test("correctly renders the large count card with a negative value", () => {
    // Render the large count card
    const component = render(
      <LargeCountCard
        title="Test Title"
        value={-100}
        subtitle="Test Subtitle"
      />
    );
    // Check for the title, value, and subtitle
    expect(component.getByText("Test Title")).toBeTruthy();
    expect(component.getByText("-$100")).toBeTruthy();
    expect(component.getByText("Test Subtitle")).toBeTruthy();
  });
  test("correctly renders the large count card with a positive value", () => {
    // Render the large count card
    const component = render(
      <LargeCountCard
        title="Test Title"
        value={100}
        subtitle="Test Subtitle"
        isValueCard
      />
    );
    // Check for the title, value, and subtitle
    expect(component.getByText("Test Title")).toBeTruthy();
    expect(component.getByText("+$100")).toBeTruthy();
    expect(component.getByText("Test Subtitle")).toBeTruthy();
  });
});
