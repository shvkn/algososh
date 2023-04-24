describe("App is available", function () {
  it("should be available on http://localhost:3000", function () {
    cy.visit("http://localhost:3000");
  });
});
