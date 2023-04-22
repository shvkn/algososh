describe("Test app routes", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });
  it("should be `string` page opened", function () {
    cy.get("[data-testId='string-card']").click();
    cy.url().should("include", "/recursion");
    cy.get("[data-testId='string-page']").should("exist");
  });
  it("should be `fibonacci` page opened", function () {
    cy.get("[data-testId='fibonacci-card']").click();
    cy.url().should("include", "/fibonacci");
    cy.get("[data-testId='fibonacci-page']").should("exist");
  });
  it("should be `sorting` page opened", function () {
    cy.get("[data-testId='sorting-card']").click();
    cy.url().should("include", "/sorting");
    cy.get("[data-testId='sorting-page']").should("exist");
  });
  it("should be `stack` page opened", function () {
    cy.get("[data-testId='stack-card']").click();
    cy.url().should("include", "/stack");
    cy.get("[data-testId='stack-page']").should("exist");
  });
  it("should be `queue` page opened", function () {
    cy.get("[data-testId='queue-card']").click();
    cy.url().should("include", "/queue");
    cy.get("[data-testId='queue-page']").should("exist");
  });
  it("should be `list` page opened", function () {
    cy.get("[data-testId='list-card']").click();
    cy.url().should("include", "/list");
    cy.get("[data-testId='list-page']").should("exist");
  });
});
