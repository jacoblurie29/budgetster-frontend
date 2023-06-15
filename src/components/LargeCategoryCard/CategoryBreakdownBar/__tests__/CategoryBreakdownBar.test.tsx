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
});
