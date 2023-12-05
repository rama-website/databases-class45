

// Function to clean up the accounts array and fill it with sample data.
function initializeAccounts() {
    const accounts = [
      {
        account_number: 101,
        balance: 5000,
        account_changes: []
      },
      {
        account_number: 102,
        balance: 8000,
        account_changes: []
      },
      
    ];
  
    return accounts;
  }
  
  module.exports = {
    initializeAccounts
  };
  