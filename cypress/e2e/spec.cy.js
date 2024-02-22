

/*
describe('Visit saucedemo page', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
  })

  it.only('[P] assert im on login page', () => {
    cy.get('.login_logo').should('have.text', 'Swag Labs')
  })

  it.only('[P] fill login form', () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
})

})
*/

describe('UI Tests for saucedemo.com', () => {
  const URL = 'https://www.saucedemo.com/';

  beforeEach(() => {
    cy.visit(URL);
  });

  it('should login, add item to cart, go to cart, logout, and verify login page', () => {
    const CREDENTIALS = {
      STANDARD_USER: {
        username: 'standard_user',
        password: 'secret_sauce'
      },
      LOCKED_OUT_USER: {
        username: 'locked_out_user',
        password: 'secret_sauce'
      },
      PROBLEM_USER: {
        username: 'problem_user',
        password: 'secret_sauce'
      }
    };

    // Login with STANDARD_USER
    cy.get('[data-test="username"]').type(CREDENTIALS.STANDARD_USER.username);
    cy.get('[data-test="password"]').type(CREDENTIALS.STANDARD_USER.password);
    cy.get('[data-test="login-button"]').click();

    // Add item to cart
    cy.get('.inventory_item_name').contains('Sauce Labs Backpack').closest('.inventory_item').find('.btn_primary').click();

    // Check that item is added to cart
    cy.get('.shopping_cart_badge').should('contain.text', '1');

    // Go to cart
    cy.get('.shopping_cart_link').click();

    // Logout
    cy.get('#react-burger-menu-btn').click();
    cy.contains('Logout').click();

    // Check that user is on login page
    cy.get('.login_logo').should('be.visible');
  });
});
