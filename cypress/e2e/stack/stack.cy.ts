import { SHORT_DELAY_IN_MS } from "../../../src/constants";
import { ElementStates } from "../../../src/types";

type TFrameItem = {
  value: string,
  state: ElementStates,
  index: number,
  top: string,
}

const testFrameAnimation = (frame: TFrameItem[]) => {
  cy.get("[class^='circle_content']").each(($el, idx, arr) => {
    const circle = $el.find("[class^='circle_circle']")[0];
    const value = circle.textContent;
    const index = Number($el.find("[class*='circle_index']")[0].textContent);

    if (idx === arr.length - 1) {
      expect($el.find("[class*='circle_head']")[0].textContent).to.equal("top");
    } else {
      expect($el.find("[class*='circle_head']")[0].textContent).to.equal("");
    }
    expect(value).to.equal(frame[index].value);
    expect(circle).to.have.attr("class").contain(`circle_${frame[index].state}`);
  });
};

describe("Stack e2e tests", () => {

  beforeEach(() => {
    cy.visit("http://localhost:3000/stack");
    cy.get("[data-cy-id='elements']").as("elements");
    cy.get("input").as("input")
    cy.get("button[class$='addButton']").as("addButton");
    cy.get("button[class$='removeButton']").as("removeButton");
    cy.get("button[class$='clearButton']").as("clearButton");
  });

  it("should toggle addButton disability by input value", function () {
    cy.get("@input").clear();

    cy.get("@input").should("have.value", "");
    cy.get("@addButton").should("be.disabled");
    cy.get("@removeButton").should("be.disabled");
    cy.get("@clearButton").should("be.disabled");
  });


  it("should `push` correctly", function () {

    const mockFrames: TFrameItem[][] = [
      [{ value: "1", state: ElementStates.Changing, index: 0, top: "top" }],
      [{ value: "1", state: ElementStates.Default, index: 0, top: "top" }],
    ];

    const mockFrames2 = [
      [
        { value: "1", state: ElementStates.Default, index: 0, top: "" },
        { value: "2", state: ElementStates.Changing, index: 1, top: "top" },
      ],
      [
        { value: "1", state: ElementStates.Default, index: 0, top: "" },
        { value: "2", state: ElementStates.Default, index: 1, top: "top" },
      ],
    ];

    cy.get("@elements").children().should("have.length", 0);

    cy.get("@input").type("1");
    cy.get("@addButton").click();

    cy.get("@addButton").should("be.disabled");
    cy.get("@removeButton").should("be.disabled");
    cy.get("@clearButton").should("be.disabled");
    cy.get("@elements").children().should("have.length", 1);

    mockFrames.forEach((frame) => {
      testFrameAnimation(frame);
      cy.wait(SHORT_DELAY_IN_MS);
    });

    cy.get("@input").type("2");
    cy.get("@addButton").click();

    cy.get("@elements").children().should("have.length", 2);

    mockFrames2.forEach((frame) => {
      testFrameAnimation(frame);
      cy.wait(SHORT_DELAY_IN_MS);
    });

  });

  it("should `pop` correctly", function () {
    const mockFrames = [
      [
        { value: "1", state: ElementStates.Default, index: 0, top: "" },
        { value: "2", state: ElementStates.Default, index: 1, top: "top" }
      ],
      [
        { value: "1", state: ElementStates.Default, index: 0, top: "" },
        { value: "2", state: ElementStates.Changing, index: 1, top: "top" }
      ],
      [
        { value: "1", state: ElementStates.Default, index: 0, top: "top" },
      ],
    ];

    cy.get("@input").type("1");
    cy.get("@addButton").click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@input").type("2");
    cy.get("@addButton").click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@elements").children().should("have.length", 2);

    cy.get("@removeButton").click();

    cy.get("@addButton").should("be.disabled");
    cy.get("@removeButton").should("be.disabled");
    cy.get("@clearButton").should("be.disabled");
    cy.get("@elements").children().should("have.length", 1);

    mockFrames.forEach((frame) => {
      testFrameAnimation(frame);
      cy.wait(SHORT_DELAY_IN_MS);
    });

  });

  it("should `clear` correctly", function() {
    cy.get("@elements").children().should("have.length", 0);

    cy.get("@input").type("1");
    cy.get("@addButton").click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@input").type("2");
    cy.get("@addButton").click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@elements").children().should("have.length", 2);

    cy.get("@clearButton").click();

    cy.get("@elements").children().should("have.length", 0);
  });

});