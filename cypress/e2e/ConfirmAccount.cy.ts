/// <reference types="cypress" />

const BASE_URL = "http://127.0.0.1:5173";
const CONFIRM_REGISTER_PAGE_PATH = "/confirm-account";

describe("ConfirmRegisterPage", () => {
  it("redirects to the home page when the confirmation code is valid", () => {
    cy.visit(BASE_URL + CONFIRM_REGISTER_PAGE_PATH);

    // Type in a valid confirmation code
    cy.get("#confirmation-code-0").type("1");
    cy.get("#confirmation-code-1").type("2");
    cy.get("#confirmation-code-2").type("3");
    cy.get("#confirmation-code-3").type("4");
    cy.get("#confirmation-code-4").type("5");
    cy.get("#confirmation-code-5").type("6");

    // Stub the response for the confirmation API request
    cy.intercept("GET", "**/register/confirm/123456", {
      statusCode: 200,
      body: { message: "Account confirmed!" },
    });

    // Click the "Confirm" button
    cy.get("button").contains("Confirm").click();

    // Verify that the user is redirected to the home page
    cy.url().should("equal", BASE_URL + "/");
  });

  it("displays an error message when the confirmation code is invalid", () => {
    cy.visit(BASE_URL + CONFIRM_REGISTER_PAGE_PATH);

    // Type in a valid confirmation code
    cy.get("#confirmation-code-0").type("1");
    cy.get("#confirmation-code-1").type("2");
    cy.get("#confirmation-code-2").type("3");
    cy.get("#confirmation-code-3").type("4");
    cy.get("#confirmation-code-4").type("5");
    cy.get("#confirmation-code-5").type("6");

    // Stub the response for the confirmation API request
    cy.intercept("GET", "**/register/confirm/123456", {
      statusCode: 400,
      body: { message: "Invalid confirmation code!" },
    });

    // Click the "Confirm" button
    cy.get("button").contains("Confirm").click();

    // Verify that an error message is displayed
    cy.get(".Toastify__toast-body").should(
      "contain.text",
      "Request failed with status code 400"
    );
  });

  it("displays an error message when no confirmation code is provided", () => {
    cy.visit(BASE_URL + CONFIRM_REGISTER_PAGE_PATH);

    // Stub the response for the confirmation API request
    cy.intercept("GET", "**/register/confirm/", {
      statusCode: 400,
      body: { message: "Please provide a confirmation code!" },
    });

    // Click the "Confirm" button
    cy.get("button").contains("Confirm").click();

    // Verify that an error message is displayed
    cy.get(".Toastify__toast-body").should(
      "contain.text",
      "Request failed with status code 400"
    );
  });
});
