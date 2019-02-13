// https://docs.cypress.io/api/introduction/api.html

describe("Smoke Test", () => {
  it("Visits the app root url", () => {
    cy.visit("/")
    cy.title().should("eq", "vue-calculator")
  })
})
