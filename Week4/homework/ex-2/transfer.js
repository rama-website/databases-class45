
const { MongoClient } = require('mongodb');
require('dotenv').config();

async function transferMoney(accounts, fromAccount, toAccount, amount, remark) {
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const session = client.startSession();
    session.startTransaction();

    const fromAcc = await accounts.findOne({ account_number: fromAccount }, { session });
    const toAcc = await accounts.findOne({ account_number: toAccount }, { session });

    if (!fromAcc || !toAcc) {
      console.error('Accounts not found.');
      return;
    }

    if (fromAcc.balance < amount) {
      console.error('Insufficient balance.');
      return;
    }

    await accounts.updateOne({ _id: fromAcc._id }, { $inc: { balance: -amount }, $push: { account_changes: { amount: -amount, changed_date: new Date(), remark } } }, { session });
    await accounts.updateOne({ _id: toAcc._id }, { $inc: { balance: amount }, $push: { account_changes: { amount, changed_date: new Date(), remark } } }, { session });

    await session.commitTransaction();
    console.log(`Transfer of ${amount} from account ${fromAccount} to ${toAccount} successful.`);
  } catch (error) {
    console.error('Error:', error);
    await session.abortTransaction();
  } finally {
    session.endSession();
    await client.close();
  }

  return accounts;
}

module.exports = {
  transferMoney
};
