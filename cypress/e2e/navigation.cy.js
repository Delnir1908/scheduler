describe('Navigation', () => {
  it('should visit root', () => {
    cy.visit('/')
  })
})

describe('Navigation', () => {
  it('should navigate to Tuesday', () => {
    cy.viewport(1280, 720)

    cy.visit('/')

    cy.contains("[data-testid=day]", 'Tuesday')
      .click()
      .should("have.css", "day-list__item--selected");
  })
})