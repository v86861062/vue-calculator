// https://docs.cypress.io/api/introduction/api.html

describe("Smoke Test", () => {
  it("Visits the app root url", () => {
    cy.visit("/")
    cy.title().should("eq", "vue-calculator")
  })
})

describe("Basic function Test", () => {
  it("Use mouse to enter an expression", () => {
    cy.visit("/")

    clickButton("1")
    clickButton("2")
    clickButton("+")
    clickButton("3")
    cy.wait(500)
    clickButton("=")
    cy.contains("12+3 = 15")
  })

  it("Use keyboard to enter an expression", () => {
    cy.visit("/")

    cy.get("input").type("5^9")

    cy.wait(500)
    cy.get("input").type("{enter}")
    cy.contains(`5^9 = ${Math.pow(5, 9)}`)
  })
})

describe("Abnormal use cases", () => {
  it("should not update results", () => {
    cy.visit("/")

    clickButton("=")
    clickButton("=")
    clickButton("=")
    cy.get(".results").should("be.empty")
  })
})

function clickButton(name) {
  cy.get("button")
    .contains(name)
    .click()
}
