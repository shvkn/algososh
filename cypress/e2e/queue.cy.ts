import { ElementStates } from "../../src/types";
import { CY_SELECTORS, HEAD, PAGES_URLS, SHORT_DELAY_IN_MS, TAIL } from "../../src/constants";

type TFrameItem = {
  value: string;
  state: ElementStates;
  index?: number;
  top?: string;
  tail?: string;
};

const testFrame = (frame: TFrameItem[]) => {
  cy.get(CY_SELECTORS.CIRCLE_CONTENT).each(($el, idx, { length }) => {
    const circle = $el.find(CY_SELECTORS.CIRCLE)[0];
    const value = circle.textContent;
    const index = Number($el.find(CY_SELECTORS.CIRCLE_INDEX)[0].textContent);

    if (idx === 0) {
      expect($el.find(CY_SELECTORS.CIRCLE_HEAD)[0].textContent).to.equal(HEAD);
    } else if (idx === length - 1) {
      expect($el.find(CY_SELECTORS.CIRCLE_TAIL)[0].textContent).to.equal(TAIL);
    } else {
      expect($el.find(CY_SELECTORS.CIRCLE_TAIL)[0].textContent).to.equal("");
      expect($el.find(CY_SELECTORS.CIRCLE_HEAD)[0].textContent).to.equal("");
    }
    expect(value).to.equal(frame[index].value);
    expect(circle).to.have.attr("class").contain(`circle_${frame[index].state}`);
  });
};

describe("Queue e2e tests", function () {
  beforeEach(() => {
    cy.visit(PAGES_URLS.QUEUE);
    cy.get("input").as("input");
    cy.get("button[class$='cyAddButton']").as("addButton");
    cy.get("button[class$='cyRemoveButton']").as("removeButton");
    cy.get("button[class$='cyClearButton']").as("clearButton");
    cy.get(".cyElements").as("elements");
  });

  it("should disable buttons while empty input", function () {
    cy.get("@input").clear();

    cy.get("@input").should("have.value", "");
    cy.get("@addButton").should("be.disabled");
    cy.get("@removeButton").should("be.disabled");
    cy.get("@clearButton").should("be.disabled");
  });

  it("should `enqueue` correctly", function () {
    const mockFrames = [
      [{ value: "1", state: ElementStates.Changing, head: HEAD, tail: TAIL, index: 0 }],
      [{ value: "1", state: ElementStates.Default, head: HEAD, tail: TAIL, index: 0 }],
    ];

    const mockFrames2 = [
      [
        { value: "1", state: ElementStates.Default, head: HEAD, tail: "", index: 0 },
        { value: "2", state: ElementStates.Changing, head: "", tail: TAIL, index: 1 },
      ],
      [
        { value: "1", state: ElementStates.Default, head: HEAD, tail: "", index: 0 },
        { value: "2", state: ElementStates.Default, head: "", tail: TAIL, index: 1 },
      ],
    ];

    cy.get("@elements").children().should("have.length", 0);

    cy.get("@input").type("1");
    cy.get("@addButton").click();

    cy.get("@elements").children().should("have.length", 1);

    mockFrames.forEach((frame) => {
      testFrame(frame);
      cy.wait(SHORT_DELAY_IN_MS);
    });

    cy.get("@input").type("2");
    cy.get("@addButton").click();

    cy.get("@elements").children().should("have.length", 2);

    mockFrames2.forEach((frame) => {
      testFrame(frame);
      cy.wait(SHORT_DELAY_IN_MS);
    });
  });

  it("should `dequeue` correctly", function () {
    const mockFrames = [
      [
        { value: "1", state: ElementStates.Changing, head: HEAD, tail: "", index: 0 },
        { value: "2", state: ElementStates.Default, head: "", tail: TAIL, index: 1 },
      ],
      [{ value: "2", state: ElementStates.Default, head: HEAD, tail: TAIL, index: 0 }],
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
      testFrame(frame);
      cy.wait(SHORT_DELAY_IN_MS);
    });
    cy.get("@elements").children().should("have.length", 1);
  });

  it("should `clear` correctly", function () {
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
