Feature: User can create a box and run it;

Scenario: User-autor logs in successfully
Given User is on secret santa login page
When User logs in with table
        |login                         |password|
        |katrinkaya86+test@gmail.com   |1qaz2wsx|
Then user is on dashboard page

Scenario: User-autor created a box and run it
When User is on createBoxPage
Then User created a box


Scenario: User-autor added participants
Then User is created an invitation

Scenario: Approve as user1, user2, user3
When User go to inviteLink
Then User logs in as "<login>" and "<password>"
Then User created a participant card
Examples:
    | login | password |
    | katrinkaya86+test1@gmail.com | 1qaz2wsx  | 
    | katrinkaya86+test2@gmail.com | 1qaz2wsx  | 
    | katrinkaya86+test3@gmail.com | 1qaz2wsx  | 

Scenario: User-autor held a draw
Given User is on secret santa login page
When User logs in with table
        |login                         |password|
        |katrinkaya86+test@gmail.com   |1qaz2wsx|
Then User went to the boxPage
Then User held a draw

Scenario: User checked notifications user1, user2, user3
Given User is on secret santa login page
Then User logs in as "<login>" and "<password>"
Then User checked notifications
Examples:
    | login | password |
    | katrinkaya86+test1@gmail.com | 1qaz2wsx  | 
    | katrinkaya86+test2@gmail.com | 1qaz2wsx  | 
    | katrinkaya86+test3@gmail.com | 1qaz2wsx  | 


Scenario: Deled box AfterAll
Then delet box AfterAll

