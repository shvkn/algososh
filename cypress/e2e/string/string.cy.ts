import { ElementStates } from "../../../src/types";
import { DELAY_IN_MS } from "../../../src/constants";

describe("string e2e tests", function () {
  let input: Cypress.Chainable<JQuery<HTMLInputElement>>;
  let button: Cypress.Chainable<JQuery<HTMLButtonElement>>;

  beforeEach(() => {
    cy.visit("http://localhost:3000/recursion");
    input = cy.get(".stringInput > input");
    button = cy.get("button[type='submit']");
    input && input.clear();
  });

  it("should toggle button disability by input value", function () {
    input.clear();
    input.should("have.value", "");
    button.should("be.disabled");
    input.type("hello");
    input.should("have.value", "hello");
    button.not("be.disabled");
    input.clear();
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

    input.type("hello");
    button.click();

    for (const frame of mockFrames) {
      cy.get("[class^='circle_circle']").each(($el, index) => {
        expect($el).to.have.attr("class").contain(`circle_${frame[index].state}`);
        expect($el).to.contain(frame[index].value);
      });
      cy.wait(DELAY_IN_MS);
    }
  });
});
