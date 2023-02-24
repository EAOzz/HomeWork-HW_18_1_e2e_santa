import { Given } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
const generalElements = require("../../fixtures/pages/general.json");
const invitePage = require("../../fixtures/pages/invitePage.json");
let inviteLink;
let wishes = faker.word.noun() +' '+ faker.word.adverb() +' '+ faker.word.adjective();

Given("User is created an invitation", function () {
  cy.get(generalElements.submitButton).click();
  cy.get(invitePage.inviteLink)
    .invoke("text")
    .then((link) => {
      inviteLink = link;
    });
  cy.clearCookies();
});

Given("User go to inviteLink", function () {
    cy.visit(inviteLink);
    cy.get(generalElements.submitButton).click();
    cy.contains("войдите").click();
});

Given("User created a participant card", function () {
  cy.contains("Создать карточку участника").should("exist");
  cy.createdUsercard(wishes);
  cy.clearCookies();
});
