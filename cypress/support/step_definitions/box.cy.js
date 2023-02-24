import { Given } from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";
const generalElements = require("../../fixtures/pages/general.json");
const boxPage = require("../../fixtures/pages/boxPage.json");
const dashboardPage = require("../../fixtures/pages/dashboardPage.json");
const users = require("../../fixtures/users.json");
let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
let maxAmount = 50;
let currency = "Евро";
let keyBox;


Given("User is on createBoxPage", function () {
    cy.contains("Создать коробку").should("exist");
});

Given("User created a box", function () {
    cy.contains("Создать коробку").click();
    cy.get(boxPage.boxNameField).type(newBoxName);
    cy.get(':nth-child(3) > .frm').invoke('val').then((key) => {
      keyBox = key;
      cy.log(keyBox)
    });
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.sixthIcon).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(boxPage.giftPriceToggle).check({ force: true });
    cy.get(boxPage.maxAnount).type(maxAmount);
    cy.get(boxPage.currency).select(currency);
    cy.get(generalElements.arrowRight).click();
    cy.get(generalElements.arrowRight).click();
    cy.get(dashboardPage.createdBoxName).should("have.text", newBoxName);
    cy.get(".layout-1__header-wrapper-fixed .toggle-menu-item span")
      .invoke("text")
      .then((text) => {
        expect(text).to.include("Участники");
        expect(text).to.include("Моя карточка");
        expect(text).to.include("Подопечный");
      });
});


Given("User went to the boxPage", function () {
  cy.get('[href="/account/boxes"] > .header-item').last().click();
  cy.contains(newBoxName).click();
});

Given("User held a draw", function () {
  cy.get('a > .txt-secondary--med').click({force: true});
  cy.get(generalElements.submitButton).click();
  cy.get('.santa-modal_content_buttons > .btn-main').click();
  cy.clearCookies();
});

Given("User checked notifications", function () {
  cy.get(dashboardPage.notificationsButton).click();
  cy.contains(newBoxName).should("exist");
  cy.get(dashboardPage.notificationsAllReadButton).click();
  cy.clearCookies();
});

Given("delet box AfterAll", function() {
    cy.clearCookies();
    let boxUrl = "/api/box/" + keyBox;
    cy.request({
      method: "DELETE",
      headers:{
        cookie: users.userAutor.cookie
      },
      url: boxUrl
    }).then((response) => {
      expect(response.status).to.eq(200);
    })
});
