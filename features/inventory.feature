Feature: Inventory Sorting

  Background:
    Given I am logged in as a standard user

  Scenario: Order products by price from low to high
    When I sort the products by "lohi"
    Then the products should be sorted by price from low to high
