@inventory
Feature: Inventory Sorting

  Background:
    Given I am on the login page
    When I login with username "standard_user" and password "secret_sauce"

  Scenario: Order products by price from low to high
    When I sort the products by "lohi"
    Then the products should be sorted by price from low to high
