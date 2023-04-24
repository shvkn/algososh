import { ElementStates } from "../../src/types";
import { DELAY_IN_MS } from "../../src/constants";

describe("String-page e2e tests", function () {

  beforeEach(() => {
    cy.visit("http://localhost:3000/recursion");
    cy.get(".stringInput > input").as("input");
    cy.get("button[type='submit']").as("button");
  });

  it("should disable buttons while empty input", function () {
    cy.get("@input").clear();
    cy.get("@input").should("have.value", "");
    cy.get("@button").should("be.disabled");
  });

  it("should be correct animation", function () {
    const mockFrames = [
      [
        { value: "h", state: ElementStates.Default },
        { value: "e", state: ElementStates.Default },
        { value: "l", state: ElementStates.Default },
        { value: "l", state: ElementStates.Default },
        { value: "o", state: ElementStates.Default },
      ],
      [
        { value: "h", state: ElementStates.Changing },
        { value: "e", state: ElementStates.Default },
        { value: "l", state: ElementStates.Default },
        { value: "l", state: ElementStates.Default },
        { value: "o", state: ElementStates.Changing },
      ],
      [
        { value: "o", state: ElementStates.Modified },
        { value: "e", state: ElementStates.Changing },
        { value: "l", state: ElementStates.Default },
        { value: "l", state: ElementStates.Changing },
        { value: "h", state: ElementStates.Modified },
      ],
      [
        { value: "o", state: ElementStates.Modified },
        { value: "l", state: ElementStates.Modified },
        { value: "l", state: ElementStates.Changing },
        { value: "e", state: ElementStates.Modified },
        { value: "h", state: ElementStates.Modified },
      ],
      [
        { value: "o", state: ElementStates.Modified },
        { value: "l", state: ElementStates.Modified },
        { value: "l", state: ElementStates.Modified },
        { value: "e", state: ElementStates.Modified },
        { value: "h", state: ElementStates.Modified },
      ],
    ];

    cy.get("@input").type("hello");
    cy.get("@button").click();

    for (const frame of mockFrames) {
      cy.get("[class^='circle_circle']").each(($el, index) => {
        expect($el).to.have.attr("class").contain(`circle_${frame[index].state}`);
        expect($el).to.contain(frame[index].value);
      });
      cy.wait(DELAY_IN_MS);
    }
  });
});
