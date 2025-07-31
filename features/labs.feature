@smoke
Feature: Labs Tab and Physician Search

  Background:
    Given I am logged in with valid credential

  Scenario Outline: Search with date filter and physician name
    When I open the Labs tab
    And I select "<dateRange>" in the date range filter
    And I search for physician "<physicianName>"
    Then I should see physician results for "<physicianName>" and "<dateRange>"

    Examples:
      | physicianName     | dateRange        |
      | Dr. Alice Smith   | Last 60 Months   |
      | Dr. John Carter   | Last 12 Months   |



@smoke
    Scenario Outline: Search with lab vendor name and date range filter
    When I open the Labs tab
    And I select "<dateRange>" in the lab date range filter
    And I search for lab vendor "<labName>"
    Then I should see lab results for "<labName>" and "<dateRange>"

    Examples:
      | dateRange     | labName           |
      | Last 3 Months | LabCorp           |
      | Last 6 Months | Quest Diagnostics |