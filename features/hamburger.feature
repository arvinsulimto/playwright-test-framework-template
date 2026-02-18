Feature: Hamburger Menu

  Background:
    Given I am on the login page
    And I login with username "standard_user" and password "secret_sauce"

  Scenario: Goto about page
    When I click the hamburger menu
    Then I should see the hamburger menu
    When I click the about link
    Then I should land in about page
