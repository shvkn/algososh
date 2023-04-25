import { ElementStates } from "../../src/types";
import { CY_SELECTORS, HEAD, PAGES_URLS, SHORT_DELAY_IN_MS, TAIL } from "../../src/constants";

type TCircle = {
  value?: string;
  state: ElementStates;
  index?: string;
  head?: string | TCircle;
  tail?: string | TCircle;
};

describe("Linked list e2e tests", function () {
  beforeEach(() => {
    cy.visit(PAGES_URLS.LIST);
    cy.get("[class$='cyInputValue'] > input").as("inputValue");
    cy.get("[class$='cyInputIndex'] > input").as("inputIndex");
    cy.get("button[class$='cyPrependButton']").as("prependButton");
    cy.get("button[class$='cyAppendButton']").as("appendButton");
    cy.get("button[class$='cyShiftButton']").as("shiftButton");
    cy.get("button[class$='cyPopButton']").as("popButton");
    cy.get("button[class$='cyAddByIndexButton']").as("addByIndexButton");
    cy.get("button[class$='cyDropByIndexButton']").as("dropByIndexButton");
    cy.get(".cyElements").as("elements");
  });

  it("should disable buttons while empty input", function () {
    cy.get("@inputValue").clear();
    cy.get("@inputIndex").clear();

    cy.get("@inputValue").should("have.value", "");
    cy.get("@inputIndex").should("have.value", "");
    cy.get("@prependButton").should("be.disabled");
    cy.get("@appendButton").should("be.disabled");
    cy.get("@addByIndexButton").should("be.disabled");
    cy.get("@dropByIndexButton").should("be.disabled");
  });

  it("should render `default` list correctly", function () {
    cy.get("@elements")
      .children()
      .each(($el, idx, arr) => {
        const circle = $el.find(CY_SELECTORS.CIRCLE);
        const index = $el.find(CY_SELECTORS.CIRCLE_INDEX).text();
        if (idx === 0) {
          expect($el.find(CY_SELECTORS.CIRCLE_HEAD).text()).to.equal(HEAD);
        } else if (idx === arr.length - 1) {
          expect($el.find(CY_SELECTORS.CIRCLE_TAIL).text()).to.equal(TAIL);
        } else {
          expect($el.find(CY_SELECTORS.CIRCLE_TAIL).text()).to.equal("");
          expect($el.find(CY_SELECTORS.CIRCLE_HEAD).text()).to.equal("");
        }
        expect(index).to.equal(`${idx}`);
        expect(circle).to.have.attr("class").contain(`circle_${ElementStates.Default}`);
      });
  });

  it("should `prepend` element correctly", function () {
    cy.get("@inputValue").type("1");
    cy.get("@prependButton").click();
    cy.get("@elements")
      .children()
      .first()
      .then(($el) => {
        const head = $el.find(CY_SELECTORS.CIRCLE_HEAD).find(CY_SELECTORS.CIRCLE);

        expect(head).to.have.attr("class").contain(`circle_${ElementStates.Changing}`);
        expect(head.text()).to.equal("1");
      });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@elements")
      .children()
      .first()
      .then(($el) => {
        const circle = $el.find(CY_SELECTORS.CIRCLE);
        const head = $el.find(CY_SELECTORS.CIRCLE_HEAD);

        expect(circle).to.have.attr("class").contain(`circle_${ElementStates.Modified}`);
        expect(circle.text()).to.equal("1");
        expect(head.text()).to.equal("head");
      });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@elements")
      .children()
      .first()
      .then(($el) => {
        const circle = $el.find(CY_SELECTORS.CIRCLE);

        expect(circle).to.have.attr("class").contain(`circle_${ElementStates.Default}`);
      });
  });

  it("should `append` element correctly", function () {
    cy.get("@inputValue").type("1");
    cy.get("@appendButton").click();
    cy.get("@elements")
      .children()
      .last()
      .then(($el) => {
        const head = $el.find(CY_SELECTORS.CIRCLE_HEAD).find(CY_SELECTORS.CIRCLE);

        expect(head).to.have.attr("class").contain(`circle_${ElementStates.Changing}`);
        expect(head.text()).to.equal("1");
      });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@elements")
      .children()
      .last()
      .then(($el) => {
        const circle = $el.find(CY_SELECTORS.CIRCLE);
        const tail = $el.find(CY_SELECTORS.CIRCLE_TAIL);

        expect(circle).to.have.attr("class").contain(`circle_${ElementStates.Modified}`);
        expect(circle.text()).to.equal("1");
        expect(tail.text()).to.equal("tail");
      });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@elements")
      .children()
      .last()
      .then(($el) => {
        const circle = $el.find(CY_SELECTORS.CIRCLE);

        expect(circle).to.have.attr("class").contain(`circle_${ElementStates.Default}`);
      });
  });

  it("should `add by index` element correctly", function () {
    let index = 2;
    cy.get("@inputValue").type("1");
    cy.get("@inputIndex").type("2");
    cy.get("@addByIndexButton").click();

    cy.wait(SHORT_DELAY_IN_MS);
    for (let i = 0; i < index; i += 1) {
      cy.get("@elements")
        .children()
        .eq(i)
        .then(($el) => {
          const head = $el.find(CY_SELECTORS.CIRCLE_HEAD).find(CY_SELECTORS.CIRCLE);

          expect(head).to.have.attr("class").contain(`circle_${ElementStates.Changing}`);
          expect(head.text()).to.equal("1");
          if (i < index) {
            const circle = $el.find(CY_SELECTORS.CIRCLE);

            expect(circle).to.have.attr("class").contain(`circle_${ElementStates.Changing}`);
          }
        });
      cy.wait(SHORT_DELAY_IN_MS);
    }
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@elements")
      .children()
      .eq(index)
      .then(($el) => {
        const circle = $el.find(CY_SELECTORS.CIRCLE);
        expect(circle).to.have.attr("class").contain(`circle_${ElementStates.Modified}`);
      });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@elements")
      .children()
      .each(($el) => {
        const circle = $el.find(CY_SELECTORS.CIRCLE);

        expect(circle).to.have.attr("class").contain(`circle_${ElementStates.Default}`);
      });
  });

  it("should `shift` element correctly", function () {
    let circleValue: string;
    let elementsLength;

    cy.get("@elements")
      .children()
      .then(($el) => {
        elementsLength = $el.length;
      });

    cy.get("@elements")
      .children()
      .first()
      .then(($el) => {
        const circle = $el.find(CY_SELECTORS.CIRCLE);
        circleValue = circle.text();
      });

    cy.get("@shiftButton").click();

    cy.get("@elements")
      .children()
      .first()
      .then(($el) => {
        const circle = $el.find(CY_SELECTORS.CIRCLE);
        const tail = $el.find(CY_SELECTORS.CIRCLE_TAIL).find(CY_SELECTORS.CIRCLE);

        expect(circle).to.have.attr("class").contain(`circle_${ElementStates.Default}`);
        expect(tail).to.have.attr("class").contain(`circle_${ElementStates.Changing}`);
        expect(tail.text()).to.equal(circleValue);
      });

    cy.wait(SHORT_DELAY_IN_MS);
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@elements")
      .children()
      .first()
      .then(($el) => {
        const tail = $el.find(CY_SELECTORS.CIRCLE_TAIL);

        expect(tail.text()).to.equal("");
      });
  });

  it("should `pop` element correctly", function () {
    let circleValue: string;
    let elementsLength;

    cy.get("@elements")
      .children()
      .then(($el) => {
        elementsLength = $el.length;
        const lastCircle = $el.last().find(CY_SELECTORS.CIRCLE);
        circleValue = lastCircle.text();
      });

    cy.get("@popButton").click();

    cy.get("@elements")
      .children()
      .last()
      .then(($el) => {
        const circle = $el.find(CY_SELECTORS.CIRCLE);
        const tail = $el.find(CY_SELECTORS.CIRCLE_TAIL).find(CY_SELECTORS.CIRCLE);

        expect(circle).to.have.attr("class").contain(`circle_${ElementStates.Default}`);
        expect(tail).to.have.attr("class").contain(`circle_${ElementStates.Changing}`);
        expect(tail.text()).to.equal(circleValue);
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@elements")
      .children()
      .last()
      .then(($el) => {
        const tail = $el.find(CY_SELECTORS.CIRCLE_TAIL);

        expect(tail.text()).to.equal(TAIL);
      });
  });

  it("should `drop by index` element correctly", function () {
    let index = 2;
    let circleValue: string;
    let elementsLength;

    cy.get("@elements")
      .children()
      .then(($el) => {
        elementsLength = $el.length;
      });

    cy.get("@inputIndex").type("2");
    cy.get("@dropByIndexButton").click();

    for (let i = 0; i < index; i += 1) {
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get("@elements")
        .children()
        .eq(i)
        .then(($el) => {
          const circle = $el.find(CY_SELECTORS.CIRCLE);
          if (i < index) {
            expect(circle).to.have.attr("class").contain(`circle_${ElementStates.Changing}`);
          } else {
            const tail = $el.find(CY_SELECTORS.CIRCLE_TAIL).find(CY_SELECTORS.CIRCLE);

            expect(tail).to.have.attr("class").contain(`circle_${ElementStates.Changing}`);
            expect(tail.text()).to.equal(circleValue);
          }
        });
    }
  });
});
