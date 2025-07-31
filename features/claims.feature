Feature: Claims Testing - Single Login Multiple Test Cases

  Background: Single Login Session
    Given I login once and navigate to claims

  Scenario Outline: Test Case 1 - Filter by date and download PDF
    When I filter claims by date "<dateLabel>" with results "<resultsOption>"
    And I download claims PDF with filename "<pdfFilename>"

    Examples:
      | dateLabel      | resultsOption | pdfFilename         |
      | Last 3 Months  | 10           | claims-3months      |

  Scenario Outline: Search by claim number with date filter
    When I search claim number "<claimNumber>" with date filter "<label>"
    Then search should complete successfully

    Examples:
      | label         | claimNumber |
      | Last 6 Months | 144111      |


   Scenario Outline: Filter by custom date range and print claims
    When I filter by custom date range from "<fromDate>" to "<toDate>"
    And I open claim details if claims are found

    Examples:
      | fromDate   | toDate     |
      | 01/01/2024 | 06/30/2024 |

  
  Scenario Outline: Apply and remove filters with provider, payee, diagnosis
    When I filter by date range "<dateRange>"
    And I apply filters with providers "<providers>" payees "<payees>" diagnoses "<diagnoses>"
    And I print the filter results
    And I uncheck filters with providers "<providers>" payees "<payees>" diagnoses "<diagnoses>"
    Then filter operations should complete successfully

    Examples:
      | dateRange      | providers    | payees    | diagnoses |
      | Last 60 Months  | Nicole Koepke |  Integra Partners Llc | Type 1 Diabetes Mellitus  |
