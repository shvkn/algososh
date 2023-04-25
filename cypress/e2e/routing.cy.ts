import { PAGES_URLS } from "../../src/constants";

describe("Test app routes", function () {
  beforeEach(function () {
    cy.visit(PAGES_URLS.MAIN);
  });
  it("should be `string` page opened", function () {
    cy.get("[data-test-id='string-card']").click();

    cy.url().should("include", PAGES_URLS.STRING);
    cy.get("[data-test-id='string-page']").should("exist");
  });
  it("should be `fibonacci` page opened", function () {
    cy.get("[data-test-id='fibonacci-card']").click();

    cy.url().should("include", PAGES_URLS.FIBONACCI);
    cy.get("[data-test-id='fibonacci-page']").should("exist");
  });
  it("should be `sorting` page opened", function () {
    cy.get("[data-test-id='sorting-card']").click();

    cy.url().should("include", PAGES_URLS.SORTING);
    cy.get("[data-test-id='sorting-page']").should("exist");
  });
  it("should be `stack` page opened", function () {
    cy.get("[data-test-id='stack-card']").click();

    cy.url().should("include", PAGES_URLS.STACK);
    cy.get("[data-test-id='stack-page']").should("exist");
  });
  it("should be `queue` page opened", function () {
    cy.get("[data-test-id='queue-card']").click();

    cy.url().should("include", PAGES_URLS.QUEUE);
    cy.get("[data-test-id='queue-page']").should("exist");
  });
  it("should be `list` page opened", function () {
    cy.get("[data-test-id='list-card']").click();

    cy.url().should("include", PAGES_URLS.LIST);
    cy.get("[data-test-id='list-page']").should("exist");
  });
});
