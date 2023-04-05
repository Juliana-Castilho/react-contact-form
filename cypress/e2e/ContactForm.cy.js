describe('Contact form', () => {
  it('should open the form correctly', () => {
    cy.visit('/')
  });

  it('should render form info correctly', () => {
    cy.visit('/');
    cy.get("[data-testid='input-info']").should('be.visible');
  });

  it('should render form message correctly', () => {
    cy.visit('/');
    cy.get("[data-testid='input-message']").should('be.visible');
  });

  it('should render form input sent correctly', () => {
    cy.visit('/');
    cy.get("[data-testid='input-sent']").should('be.visible');
  });

  it('should render button form submit correctly', () => {
    cy.visit('/');
    cy.get("[data-testid='button-submit']").should('be.visible');
  });

  it('should submit button correctly', () => {
    cy.visit('/');
    cy.get("[data-testid='button-submit']").click();
  });
})