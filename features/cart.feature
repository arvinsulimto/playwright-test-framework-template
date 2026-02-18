Feature: Add to Cart

  Background:
    Given I am on the login page
    And I login with username "standard_user" and password "secret_sauce"

  Scenario Outline: Add a single item to the cart
    When I add "<item_name>" to the cart
    Then the cart badge should verify "1"
    And I should see "<item_name>" in the cart

    Examples:
      | item_name                |
      | Sauce Labs Backpack      |
      | Sauce Labs Fleece Jacket |
