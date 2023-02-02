const users = require("../fixtures/users.json");
const boxPage = require("../fixtures/pages/boxPage.json");
const generalElements = require("../fixtures/pages/general.json");
const dashboardPage = require("../fixtures/pages/dashboardPage.json");
const invitePage = require("../fixtures/pages/invitePage.json");
import { faker } from "@faker-js/faker";

describe("user can create a box and run it", () => {
  //пользователь 1 логинится
  //пользователь 1 создает коробку
  //пользователь 1 получает приглашение
  //пользователь 2 переходит по приглашению
  //пользователь 2 заполняет анкету
  //пользователь 3 переходит по приглашению
  //пользователь 3 заполняет анкету
  //пользователь 4 переходит по приглашению
  //пользователь 4 заполняет анкету
  //пользователь 1 логинится
  //пользователь 1 запускает жеребьевку
  let newBoxName = faker.word.noun({ length: { min: 5, max: 10 } });
  let wishes = faker.word.noun() +' '+ faker.word.adverb() +' '+ faker.word.adjective();
  let maxAmount = 50;
  let currency = "Евро";
  let inviteLink;
  let keyBox;

  it("user logins and create a box", () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.contains("Создать коробку").click();
    cy.get(boxPage.boxNameField).type(newBoxName);
    cy.get(':nth-child(3) > .frm').invoke('val').then((key) => {
      keyBox = key;
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

  it("add participants", () => {
    cy.get(generalElements.submitButton).click();
    cy.get(invitePage.inviteLink)
      .invoke("text")
      .then((link) => {
        inviteLink = link;
      });
    cy.clearCookies();
  });

  

  it("approve as user1, user2, user3", () => {
    Object.entries(users).forEach((user, index) => {
      if (index < 1) {
        return
      }
        else {
          cy.visit(inviteLink);
          cy.get(generalElements.submitButton).click();
          cy.contains("войдите").click();
          cy.login(user[1].email, user[1].password);
          cy.contains("Создать карточку участника").should("exist");
          cy.createdUsercard(wishes);
          cy.clearCookies();
        }
    });
  });

  it("draw", () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.get('[href="/account/boxes"] > .header-item').last().click();
    cy.contains(newBoxName).click();
    cy.get('a > .txt-secondary--med').click({force: true});
    cy.get(generalElements.submitButton).click();
    cy.get('.santa-modal_content_buttons > .btn-main').click();
    cy.clearCookies();
  })
    
  it('checking notifications user1, user2, user3', () => {
    Object.entries(users).forEach((user, index) => {
      if (index < 1) {
        return
      }
        else {
          cy.visit("/login");
          cy.login(user[1].email, user[1].password);
          cy.get(dashboardPage.notificationsButton).click();
          cy.contains(newBoxName).should("exist");
          cy.get(dashboardPage.notificationsAllReadButton).click();
          cy.clearCookies();
        }
    });
  });

   after("delete box", () => {
    cy.visit("/login");
    cy.login(users.userAutor.email, users.userAutor.password);
    cy.get(dashboardPage.boxButton).last().click();
    cy.get(boxPage.boxCardButton).first().click();
    cy.get(boxPage.boxMenuButton).last().click();
    cy.contains("Архивация и удаление").click({ force: true });
    cy.get(boxPage.boxDeleteField).type(
      "Удалить коробку"
    );
    cy.get(boxPage.doxDeleteConfirmationButton).click();
  });
});
