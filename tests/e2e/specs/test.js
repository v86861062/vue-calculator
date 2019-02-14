// https://docs.cypress.io/api/introduction/api.html

beforeEach(() => {
  cy.visit("/")
})

describe("Smoke Test", () => {
  it("Visits the app root url", () => {
    cy.title().should("eq", "vue-calculator")
  })
})

describe("Basic function Test", () => {
  it("Use mouse to enter an expression", () => {
    clickButton("1")
    clickButton("2")
    clickButton("×")
    clickButton("3")
    waitForResult()
    clickButton("=")

    cy.contains("12×3 = 36")
  })

  it("Use keyboard to enter an expression", () => {
    enterExpression("9/9")
    waitForResult()
    enterExpression("{enter}")

    cy.contains(`9/9 = 1`)
  })

  it("Should clear results history", () => {
    enterExpression("5+6")
    waitForResult()
    enterExpression("{enter}")

    enterExpression("7-8")
    waitForResult()
    enterExpression("{enter}")

    clickButton("AC")

    cy.get(".results").should("be.empty")
  })

  it("Should display Error", () => {
    enterExpression("5+-*/")
    waitForResult()

    cy.get(".ans").contains("= error")
  })
})

describe("Abnormal use cases", () => {
  it("Should not update results", () => {
    clickButton("=")
    clickButton("=")
    clickButton("=")

    cy.get(".results").should("be.empty")
  })
})

function enterExpression(str) {
  cy.get("input").type(str)
}

function clickButton(name) {
  cy.get("button")
    .contains(name)
    .click()
}

function waitForResult() {
  cy.wait(500)
}
