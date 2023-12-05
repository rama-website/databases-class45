async function getTotalPopulationByCountryAndYear(country) {
    const client = new MongoClient(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  
    try {
      await client.connect();
      const db = client.db('databaseWeek4');
  
      const pipeline = [
        { $match: { Country: country } },
        { $group: { _id: '$Year', countPopulation: { $sum: { $add: ['$M', '$F'] } } } },
      ];
  
      const result = await db.collection('populationData').aggregate(pipeline).toArray();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      client.close();
    }
  }
  
  getTotalPopulationByCountryAndYear('Netherlands'); // Change country name as needed
  