
// Function to transfer money from one account to another
function transferMoney(accounts, fromAccount, toAccount, amount, remark) {
    const fromAcc = accounts.find(acc => acc.account_number === fromAccount);
    const toAcc = accounts.find(acc => acc.account_number === toAccount);
  
    if (!fromAcc || !toAcc) {
      console.error('Accounts not found.');
      return;
    }
  
    if (fromAcc.balance < amount) {
      console.error('Insufficient balance.');
      return;
    }
  
    fromAcc.balance -= amount;
    toAcc.balance += amount;
  
    const latestFromChangeNumber = fromAcc.account_changes.length > 0 ? fromAcc.account_changes[fromAcc.account_changes.length - 1].change_number : 0;
    const latestToChangeNumber = toAcc.account_changes.length > 0 ? toAcc.account_changes[toAcc.account_changes.length - 1].change_number : 0;
  
    fromAcc.account_changes.push({
      change_number: latestFromChangeNumber + 1,
      amount: -amount,
      changed_date: new Date(),
      remark
    });
  
    toAcc.account_changes.push({
      change_number: latestToChangeNumber + 1,
      amount,
      changed_date: new Date(),
      remark
    });
  
    console.log(`Transfer of ${amount} from account ${fromAccount} to ${toAccount} successful.`);
    return accounts;
  }
  
  module.exports = {
    transferMoney
  };
  