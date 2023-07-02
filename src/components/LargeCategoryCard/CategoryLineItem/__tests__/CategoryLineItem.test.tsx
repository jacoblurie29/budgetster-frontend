import { testExpensesData } from "../../../../util/testing/testData";
import CategoryLineItem from "../CategoryLineItem";
import { render } from "@testing-library/react";

describe("CategoryLineItem Tests", () => {
  test("correctly renders snapshot", () => {
    const component = render(
      <CategoryLineItem
        title={testExpensesData[0].name}
        value={testExpensesData[0].value}
        percentage={40}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test("correctly renders the category line item", () => {
    // Render the category line item
    const component = render(
      <CategoryLineItem
        title={testExpensesData[0].name}
        value={testExpensesData[0].value}
        percentage={40}
      />
    );

    // Obtain the category line item by its testId
    const categoryLineItem = component.getByTestId("categorylineitem-testId");

    // Check that the title is rendered correctly
    expect(categoryLineItem.children[0].children[0].innerHTML).toBe("Rent");

    // Check that the percentage is rendered correctly
    expect(categoryLineItem.children[1].children[1].innerHTML).toBe("40%");

    // Check that the value is rendered correctly
    expect(categoryLineItem.children[0].children[1].innerHTML).toBe("$1000");
  });

  test("correctly renders the category line item when the value is negative", () => {
    // Render the category line item
    const component = render(
      <CategoryLineItem
        title={testExpensesData[1].name}
        value={-testExpensesData[1].value}
        percentage={40}
      />
    );

    // Obtain the category line item by its testId
    const categoryLineItem = component.getByTestId("categorylineitem-testId");

    // Check that the title is rendered correctly
    expect(categoryLineItem.children[0].children[0].innerHTML).toBe(
      "Groceries"
    );

    // Check that the percentage is rendered correctly
    expect(categoryLineItem.children[1].children[1].innerHTML).toBe("40%");

    // Check that the value is rendered correctly
    expect(categoryLineItem.children[0].children[1].innerHTML).toBe("-$500");
  });
  test("correctly renders the category line item when the value is positive", () => {
    // Render the category line item
    const component = render(
      <CategoryLineItem
        title={testExpensesData[2].name}
        value={testExpensesData[2].value}
        percentage={40}
      />
    );

    // Obtain the category line item by its testId
    const categoryLineItem = component.getByTestId("categorylineitem-testId");

    // Check that the title is rendered correctly
    expect(categoryLineItem.children[0].children[0].innerHTML).toBe("Gas");

    // Check that the percentage is rendered correctly
    expect(categoryLineItem.children[1].children[1].innerHTML).toBe("40%");

    // Check that the value is rendered correctly
    expect(categoryLineItem.children[0].children[1].innerHTML).toBe("$100");
  });
  test("correctly renders the category line item when the percentage is less than 1", () => {
    // Render the category line item
    const component = render(
      <CategoryLineItem
        title={testExpensesData[2].name}
        value={testExpensesData[2].value}
        percentage={0}
      />
    );

    // Obtain the category line item by its testId
    const categoryLineItem = component.getByTestId("categorylineitem-testId");

    // Check that the title is rendered correctly
    expect(categoryLineItem.children[0].children[0].innerHTML).toBe("Gas");

    // Check that the percentage is rendered correctly
    expect(categoryLineItem.children[1].children[1].innerHTML).toBe("&lt; 1%");

    // Check that the value is rendered correctly
    expect(categoryLineItem.children[0].children[1].innerHTML).toBe("$100");
  });
});
