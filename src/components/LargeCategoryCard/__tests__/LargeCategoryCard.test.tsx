import { MonetaryItemCategory, TimePeriod } from "../../../types/types";
import {
  testExpensesData,
  testIncomesData,
} from "../../../util/testing/testData";
import LargeCategoryCard from "../LargeCategoryCard";
import { render } from "@testing-library/react";

describe("LargeCategoryCard Tests", () => {
  test("correctly renders snapshot", () => {
    console.log(testExpensesData[0]);
    const component = render(
      <LargeCategoryCard
        title={"Expenses"}
        values={testExpensesData}
        timePeriod={TimePeriod.MONTHLY}
        category={MonetaryItemCategory.EXPENSE}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test("correctly renders the large category card", () => {
    // Render the large category card
    const component = render(
      <LargeCategoryCard
        title={"Expenses"}
        values={testExpensesData}
        timePeriod={TimePeriod.MONTHLY}
        category={MonetaryItemCategory.EXPENSE}
      />
    );

    // Obtain the large category card by its testId
    const largeCategoryCard = component.getByTestId("largecategorycard-testId");

    // Check that the title is rendered correctly
    expect(largeCategoryCard.children[0].children[0].innerHTML).toBe(
      "Expenses"
    );

    // Check that the category breakdown bar is rendered correctly
    expect(largeCategoryCard.children[0].children[1].innerHTML).toBe(
      "-$1800 / month"
    );

    // Check that the category line items are rendered correctly
    expect(largeCategoryCard.children[1].children.length).toBe(5);

    // Check that the category line items are rendered in the correct order
    expect(
      largeCategoryCard.children[1].children[1].children[0].children[0]
        .innerHTML
    ).toContain("Rent");
    expect(
      largeCategoryCard.children[1].children[1].children[0].children[1]
        .innerHTML
    ).toBe("$1000");
    expect(
      largeCategoryCard.children[1].children[2].children[0].children[0]
        .innerHTML
    ).toContain("Groceries");
    expect(
      largeCategoryCard.children[1].children[2].children[0].children[1]
        .innerHTML
    ).toBe("$500");
    expect(
      largeCategoryCard.children[1].children[3].children[0].children[0]
        .innerHTML
    ).toContain("Car Insurance");
    expect(
      largeCategoryCard.children[1].children[3].children[0].children[1]
        .innerHTML
    ).toBe("$200");
    expect(
      largeCategoryCard.children[1].children[4].children[0].children[0]
        .innerHTML
    ).toContain("Gas");
    expect(
      largeCategoryCard.children[1].children[4].children[0].children[1]
        .innerHTML
    ).toBe("$100");
  });

  test("correctly renders the large category card when the category is income", () => {
    // Render the large category card
    const component = render(
      <LargeCategoryCard
        title={"Income"}
        values={testIncomesData}
        timePeriod={TimePeriod.YEARLY}
        category={MonetaryItemCategory.INCOME}
      />
    );

    // Obtain the large category card by its testId
    const largeCategoryCard = component.getByTestId("largecategorycard-testId");

    // Check that the category breakdown bar is rendered correctly
    expect(largeCategoryCard.children[0].children[1].innerHTML).toBe(
      "$2500 / year"
    );

    // Check that the category line items are rendered correctly
    expect(largeCategoryCard.children[1].children.length).toBe(3);

    // Check that the category line items are rendered in the correct order
    expect(
      largeCategoryCard.children[1].children[1].children[0].children[0]
        .innerHTML
    ).toContain("Paycheck");
    expect(
      largeCategoryCard.children[1].children[1].children[0].children[1]
        .innerHTML
    ).toBe("$2000");
    expect(
      largeCategoryCard.children[1].children[2].children[0].children[0]
        .innerHTML
    ).toContain("Side Hustle");
    expect(
      largeCategoryCard.children[1].children[2].children[0].children[1]
        .innerHTML
    ).toBe("$500");
  });
});
