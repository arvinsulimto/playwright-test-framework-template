Feature: Add to Cart

    Background:
        Given I am on the login page
        And I login with username "standard_user" and password "secret_sauce"

    Scenario: Add a single item to the cart
        When I add "Sauce Labs Backpack" to the cart
        Then the cart badge should verify "1"
        And I should see "Sauce Labs Backpack" in the cart
