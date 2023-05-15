/// <reference types="cypress" />

import users from "../fixtures/login.json";

describe("LoginPage", () => {
  describe("Regular user", () => {
    beforeEach(() => {
      // Intercept login request and return a response with JWT token and user's role
      cy.intercept("POST", "**/login", (req) => {
        const { user, password } = req.body;

        // Verify that the request body matches the mock user
        expect(user).to.eq(users.regularUser.email);
        expect(password).to.eq(users.regularUser.password);

        // Return a response with a JWT token and the user's role
        req.reply((res) => {
          res.send({
            statusCode: 200,
            body: {
              jwt: "some-jwt-token",
              role: users.regularUser.role,
            },
          });
        });
      });

      cy.visit("http://127.0.0.1:5173/login");
    });

    it("should log in with valid credentials and redirect to /", () => {
      // Enter the mock user's email and password
      cy.get("[name=usernameOrEmail]").type(users.regularUser.email);
      cy.get("[name=password]").type(users.regularUser.password);
      cy.get("form").submit();

      // Verify that the user is redirected to the homepage
      cy.url().should("eq", "http://127.0.0.1:5173/");
    });

    it("should display an error message with wrong credentials", () => {
      cy.intercept("POST", "**/login", (req) => {
        req.reply((res) => {
          res.send({
            statusCode: 403,
            body: {
              error: "Invalid username or password",
            },
          });
        });
      });

      cy.get("[name=usernameOrEmail]").type("wrongemail@example.com");
      cy.get("[name=password]").type("wrongpassword");
      cy.get("form").submit();

      cy.contains("Incorrect username/email or password.");
    });
  });

  describe("Moderator user", () => {
    beforeEach(() => {
      // Intercept login request and return a response with JWT token and user's role
      cy.intercept("POST", "**/login", (req) => {
        const { user, password } = req.body;

        // Verify that the request body matches the mock user
        expect(user).to.eq(users.moderatorUser.email);
        expect(password).to.eq(users.moderatorUser.password);

        // Return a response with a JWT token and the user's role
        req.reply((res) => {
          res.send({
            statusCode: 200,
            body: {
              jwt: "some-jwt-token",
              role: users.moderatorUser.role,
            },
          });
        });
      });

      cy.visit("http://127.0.0.1:5173/login");
    });

    it("should log in with valid credentials and redirect to /navigation", () => {
      // Enter the mock user's email and password
      cy.get("[name=usernameOrEmail]").type(users.moderatorUser.email);
      cy.get("[name=password]").type(users.moderatorUser.password);
      cy.get("form").submit();

      // Verify that the user is redirected to the navigation page
      cy.url().should("contain", "/navigation");
    });
  });

  describe("Admin user", () => {
    beforeEach(() => {
      // Intercept login request and return a response with JWT token and user's role
      cy.intercept("POST", "**/login", (req) => {
        const { user, password } = req.body;

        // Verify that the request body matches the mock user
        expect(user).to.eq(users.adminUser.email);
        expect(password).to.eq(users.adminUser.password);

        // Return a response with a JWT token and the user's role
        req.reply((res) => {
          res.send({
            statusCode: 200,
            body: {
              jwt: "some-jwt-token",
              role: users.adminUser.role,
            },
          });
        });
      });

      cy.visit("http://127.0.0.1:5173/login");
    });

    it("should log in with valid credentials and redirect to /navigation", () => {
      cy.get("[name=usernameOrEmail]").type(users.adminUser.email);
      cy.get("[name=password]").type(users.adminUser.password);
      cy.get("form").submit();

      cy.url().should("contain", "/navigation");
    });
  });
});
