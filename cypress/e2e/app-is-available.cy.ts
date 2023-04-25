import { TEST_URL } from "../../src/constants";

describe("App is available", function () {
  it(`should be available on ${TEST_URL}`, function () {
    cy.visit("/");
  });
});
