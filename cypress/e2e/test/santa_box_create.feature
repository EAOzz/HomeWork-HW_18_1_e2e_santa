Feature: User can create a box and run it;

Scenario: User-autor logs in successfully
Given User is on secret santa login page
When User logs in with table
        |login                         |password|
        |katrinkaya86+test@gmail.com   |1qaz2wsx|
Then user is on dashboard page

