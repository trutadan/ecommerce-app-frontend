/// <reference types="cypress" />

describe('NavigationSelector', () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/navigation");
    });
  
    it('should navigate to the staff menu', () => {
      cy.contains('Staff').click();
      cy.url().should('include', '/staff/menu');
    });
  
    it('should navigate to the user page', () => {
      cy.contains('User').click();
      cy.url().should('equal', "http://localhost:5173/");
    });
  });
  