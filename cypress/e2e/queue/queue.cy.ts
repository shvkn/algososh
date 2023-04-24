import { ElementStates } from "../../../src/types";
import { SHORT_DELAY_IN_MS } from "../../../src/constants";

type TFrameItem = {
  value: string;
  state: ElementStates;
  index?: number;
  top?: string;
  tail?: string;
};

const testFrameAnimation = (frame: TFrameItem[]) => {
  cy.get("[class^='circle_content']").each(($el, idx, arr) => {
    const circle = $el.find("[class^='circle_circle']")[0];
    const value = circle.textContent;
    const index = Number($el.find("[class*='circle_index']")[0].textContent);

    if (idx === 0) {
      expect($el.find("[class*='circle_head']")[0].textContent).to.equal("head");
    } else if (idx === arr.length - 1) {
      expect($el.find("[class*='circle_tail']")[0].textContent).to.equal("tail");
    } else {
      expect($el.find("[class*='circle_tail']")[0].textContent).to.equal("");
      expect($el.find("[class*='circle_head']")[0].textContent).to.equal("");
    }
    expect(value).to.equal(frame[index].value);
    expect(circle).to.have.attr("class").contain(`circle_${frame[index].state}`);
  });
};

describe("Queue e2e tests", function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000/queue");
    cy.get("input").as("input");
    cy.get("button[class$='cyAddButton']").as("addButton");
    cy.get("button[class$='cyRemoveButton']").as("removeButton");
    cy.get("button[class$='cyClearButton']").as("clearButton");
    cy.get(".cyElements").as("elements");
  });

  it("should toggle addButton disability by input value", function () {
    cy.get("@input").clear();

    cy.get("@input").should("have.value", "");
    cy.get("@addButton").should("be.disabled");
    cy.get("@removeButton").should("be.disabled");
    cy.get("@clearButton").should("be.disabled");
  });

  it("should `enqueue` correctly", function () {
    const mockFrames = [
      [{ value: "1", state: ElementStates.Changing, head: "head", tail: "tail", index: 0 }],
      [{ value: "1", state: ElementStates.Default, head: "head", tail: "tail", index: 0 }],
    ];

    const mockFrames2 = [
      [
        { value: "1", state: ElementStates.Default, head: "head", tail: "", index: 0 },
        { value: "2", state: ElementStates.Changing, head: "", tail: "tail", index: 1 },
      ],
      [
        { value: "1", state: ElementStates.Default, head: "head", tail: "", index: 0 },
        { value: "2", state: ElementStates.Default, head: "", tail: "tail", index: 1 },
      ],
    ];

    cy.get("@elements").children().should("have.length", 0);

    cy.get("@input").type("1");
    cy.get("@addButton").click();

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

  it("should `dequeue` correctly", function() {
    const mockFrames = [
      [
        { value: "1", state: ElementStates.Changing, head: "head", tail: "", index: 0 },
        { value: "2", state: ElementStates.Default, head: "", tail: "tail", index: 1 },
      ],
      [
        { value: "2", state: ElementStates.Default, head: "head", tail: "tail", index: 0 },
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
    mockFrames.forEach((frame) => {
      testFrameAnimation(frame);
      cy.wait(SHORT_DELAY_IN_MS);
    });
    cy.get("@elements").children().should("have.length", 1);
  });

  it("should `clear` correctly", function() {
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
