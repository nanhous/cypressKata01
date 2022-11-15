/// <reference types="cypress" />

const { faker } = require("@faker-js/faker");
let firstName = faker.name.firstName();
let lastName = faker.name.lastName();
let eMail = faker.internet.email(firstName, lastName);
let age = faker.datatype.number(100);

describe("Suite de tests formulaire", () => {
  it("Affichage des Q&A", () => {
    cy.visit("index.html");
    cy.get('[data-cy="form"]').should("be.visible");
    cy.get('[data-cy="lastNameLabel"]').should("be.visible");
    cy.get('[data-cy="last-name"]').should("be.visible");
  });

  it("Affichage messages d'erreur", () => {
    cy.visit("index.html");
    cy.get('[data-cy="form"]').should("be.visible");
    cy.get('[data-cy="submit"]').click();
  });

  it("Validation formulaire", () => {
    cy.visit("index.html");
    cy.get('[data-cy="form"]').should("be.visible");
    //INFOS UTILISATEUR
    cy.get('[data-cy="first-name"]').type(firstName);
    cy.get('[data-cy="last-name"]').type(lastName);
    cy.get('[data-cy="email"]').type(eMail);
    cy.get('[data-cy="age"]').type(age);
    //RECOMMANDATION
    cy.get('[data-cy="recommend-maybe"]').check().should("be.checked");
    cy.get('[data-cy="recommend-yes"]').check().should("be.checked");
    cy.get('[data-cy="recommend-maybe"]').should("not.be.checked");
    //FRAMEWORK
    cy.get('[data-cy="cypress"]').click();
    cy.get('[data-cy="appium"]').click();
    //NIVEAU HTML
    cy.get('[data-cy="level"]').select("Moyen");
    //SUGGESTION
    cy.get('[data-cy="suggestions"]').type(
      "Cette formation est vraiment trop cool"
    );
    //VALIDATION
    //cy.get('[data-cy="form"]').submit();
    //cy.get('[data-cy="submit"]').click();
  });

  it("Réinitialisation formulaire", () => {
    cy.visit("index.html");
    cy.get('[data-cy="form"]').should("be.visible");
    //INFOS UTILISATEUR
    cy.get('[data-cy="first-name"]').type(firstName);
    cy.get('[data-cy="last-name"]').type(lastName);
    cy.get('[data-cy="email"]').type(eMail);
    cy.get('[data-cy="age"]').type(age);
    //RECOMMANDATION
    cy.get('[data-cy="recommend-maybe"]').check().should("be.checked");
    //FRAMEWORK
    cy.get('[data-cy="cypress"]').click();
    cy.get('[data-cy="appium"]').click();
    //RECHARGEMENT PAGE
    cy.reload();
    cy.get('[data-cy="form"]').should("be.visible");
    //FORMULAIRE VIDE
    cy.get('[data-cy="first-name"]').should("be.empty");
    cy.get('[data-cy="last-name"]').should("be.empty");
    cy.get('[data-cy="email"]').should("be.empty");
    cy.get('[data-cy="age"]').should("be.empty");
    cy.get('[data-cy="recommend-maybe"]').should("not.be.checked");
    cy.get('[data-cy="cypress"]').should("not.be.checked");
    cy.get('[data-cy="appium"]').should("not.be.checked");
  });
});
