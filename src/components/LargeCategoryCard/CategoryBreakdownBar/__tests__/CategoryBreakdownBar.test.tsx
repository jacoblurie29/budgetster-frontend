import CategoryBreakdownBar from "../CategoryBreakdownBar";
import { testExpensesData } from "../../../../util/testing/testData";
import { render } from "@testing-library/react";

describe("CategoryBreakdownBar Tests", () => {
  test("correctly renders snapshot", () => {
    const component = render(
      <CategoryBreakdownBar values={testExpensesData} />
    );
    expect(component).toMatchSnapshot();
  });

  test("correctly renders the category breakdown bar", () => {
    // Render the category breakdown bar
    const component = render(
      <CategoryBreakdownBar values={testExpensesData} />
    );

    // Obtain the category breakdown bar by its testId
    const categoryBreakdownBar = component.getByTestId(
      "categorybreakdownbar-testId"
    );

    // Check that the correct number of values are rendered
    expect(categoryBreakdownBar.children.length).toBe(7);

    // Check that the values are rendered in the correct order
    expect(categoryBreakdownBar.children[0].innerHTML).toBe("Rent");
    expect(categoryBreakdownBar.children[2].innerHTML).toBe("Groceries");
  });
});
