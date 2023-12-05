const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');
require('dotenv').config();

async function insertCSVDataToMongoDB() {
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db('databaseWeek4'); 
    const collection = db.collection('populationData'); 

    const data = [];
    fs.createReadStream('./population_pyramid_1950-2022.csv')
      .pipe(csv())
      .on('data', (row) => {
        // Transform CSV rows into MongoDB documents
        const document = {
          Country: row.Country,
          Year: parseInt(row.Year),
          Age: row.Age,
          M: parseInt(row.M),
          F: parseInt(row.F),
        };
        data.push(document);
      })
      .on('end', async () => {
        // Insert documents into MongoDB collection
        const result = await collection.insertMany(data);
        console.log(`${result.insertedCount} documents inserted.`);
        client.close();
      });
  } catch (error) {
    console.error('Error:', error);
    client.close();
  }
}

insertCSVDataToMongoDB();
