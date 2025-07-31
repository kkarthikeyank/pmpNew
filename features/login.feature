Feature: User Login

  Scenario Outline: Login with different credentials
    Given I am on the login page
    When I login with "<username>" and "<password>"
    Then I should be logged in successfully
    
    Examples:
      | username | password   |
      | Julia    | Batman123  |
      | TestUser | Password1  |

  Scenario: Login with invalid credentials
    Given I am on the login page
    When I login with "invalid" and "wrongpass"
    Then I should see login error