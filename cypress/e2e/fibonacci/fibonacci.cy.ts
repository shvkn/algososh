import { ElementStates } from "../../../src/types";
import { SHORT_DELAY_IN_MS } from "../../../src/constants";

describe("fibonacci e2e tests", () => {
  let input: Cypress.Chainable<JQuery<HTMLInputElement>>;
  let button: Cypress.Chainable<JQuery<HTMLButtonElement>>;

  beforeEach(() => {
    cy.visit("http://localhost:3000/fibonacci");
    input = cy.get("input");
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
        { value: "1", state: ElementStates.Default, index: "0" },
      ],
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
      ]
    ];
    input.type("5");
    button.click();

    for (let frame of mockFrames) {
      cy.get("[class^='circle_content']").each(($el) => {
        const circle = $el.find("[class^='circle_circle']")[0]
        const value = circle.textContent;
        const index = Number($el.find("[class*='circle_index']")[0].textContent);
        expect(value).to.equal(frame[index].value);
        expect(circle).to.have.attr("class").contain(`circle_${frame[index].state}`);
      })
      cy.wait(SHORT_DELAY_IN_MS);
    }
  });

});
