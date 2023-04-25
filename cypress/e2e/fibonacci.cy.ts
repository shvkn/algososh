import { ElementStates } from "../../src/types";
import { CY_SELECTORS, PAGES_URLS, SHORT_DELAY_IN_MS } from "../../src/constants";

describe("fibonacci e2e tests", () => {
  beforeEach(() => {
    cy.visit(PAGES_URLS.FIBONACCI);
    cy.get("input").as("input");
    cy.get("button[type='submit']").as("button");
  });

  it("should disable buttons while empty input", function () {
    cy.get("@input").clear();

    cy.get("@input").should("have.value", "");
    cy.get("@button").should("be.disabled");
  });

  it("should be correct animation", function () {
    const mockFrames = [
      [{ value: "1", state: ElementStates.Default, index: "0" }],
      [
        { value: "1", state: ElementStates.Default, index: "0" },
        { value: "1", state: ElementStates.Default, index: "1" },
      ],
      [
        { value: "1", state: ElementStates.Default, index: "0" },
        { value: "1", state: ElementStates.Default, index: "1" },
        { value: "2", state: ElementStates.Default, index: "2" },
      ],
      [
        { value: "1", state: ElementStates.Default, index: "0" },
        { value: "1", state: ElementStates.Default, index: "1" },
        { value: "2", state: ElementStates.Default, index: "2" },
        { value: "3", state: ElementStates.Default, index: "3" },
      ],
      [
        { value: "1", state: ElementStates.Default, index: "0" },
        { value: "1", state: ElementStates.Default, index: "1" },
        { value: "2", state: ElementStates.Default, index: "2" },
        { value: "3", state: ElementStates.Default, index: "3" },
        { value: "5", state: ElementStates.Default, index: "4" },
      ],
      [
        { value: "1", state: ElementStates.Default, index: "0" },
        { value: "1", state: ElementStates.Default, index: "1" },
        { value: "2", state: ElementStates.Default, index: "2" },
        { value: "3", state: ElementStates.Default, index: "3" },
        { value: "5", state: ElementStates.Default, index: "4" },
        { value: "8", state: ElementStates.Default, index: "5" },
      ],
    ];
    cy.get("@input").type("5");
    cy.get("@button").click();

    for (let frame of mockFrames) {
      cy.get(CY_SELECTORS.CIRCLE_CONTENT).each(($el) => {
        const circle = $el.find(CY_SELECTORS.CIRCLE);
        const value = circle.text();
        const index = Number($el.find(CY_SELECTORS.CIRCLE_INDEX).text());
        expect(value).to.equal(frame[index].value);
        expect(circle).to.have.attr("class").contain(`circle_${frame[index].state}`);
      });
      cy.wait(SHORT_DELAY_IN_MS);
    }
  });
});
