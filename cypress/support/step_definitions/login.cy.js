import { Given } from "@badeball/cypress-cucumber-preprocessor";


Given("User is on secret santa login page", function () {
  cy.visit("/login");
});

Given("User logs in with table", function (dataTable) {
  cy.login(dataTable.hashes()[0].login, dataTable.hashes()[0].password)
});


Given("User logs in as {string} and {string}", function (login, password) {
    cy.login(login, password)
  }
);

Given("user is on dashboard page", function () {
  cy.contains("Создать коробку").should("exist");
});
