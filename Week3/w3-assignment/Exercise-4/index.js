const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config();
const { seedDatabase } = require("./seedDatabase.js");

async function createEpisodeExercise(client) {
  const episodeToAdd = {
    episode: "S09E13",
    title: "MOUNTAIN HIDE-AWAY",
    elements: [
      "CIRRUS",
      "CLOUDS",
      "CONIFER",
      "DECIDIOUS",
      "GRASS",
      "MOUNTAIN",
      "MOUNTAINS",
      "RIVER",
      "SNOWY_MOUNTAIN",
      "TREE",
      "TREES",
    ],
  };

  const result = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .insertOne(episodeToAdd);

  console.log(
    `Created season 9 episode 13 and the document got the id ${result.insertedId}`
  );
}

async function findEpisodesExercises(client) {
  const episode2Season2 = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .findOne({ episode: "S02E02" });

  console.log(`The title of episode 2 in season 2 is ${episode2Season2.title}`);

  const blackRiverEpisode = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .findOne({ title: "BLACK RIVER" });

  console.log(
    `The season and episode number of the "BLACK RIVER" episode is ${blackRiverEpisode.episode}`
  );

  const cliffEpisodes = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .find({ elements: "CLIFF" })
    .toArray();

  const cliffEpisodeTitles = cliffEpisodes.map((episode) => episode.title);
  console.log(`The episodes that Bob Ross painted a CLIFF are ${cliffEpisodeTitles}`);

  const cliffLighthouseEpisodes = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .find({ elements: { $all: ["CLIFF", "LIGHTHOUSE"] } })
    .toArray();

  const cliffLighthouseEpisodeTitles = cliffLighthouseEpisodes.map(
    (episode) => episode.title
  );
  console.log(
    `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${cliffLighthouseEpisodeTitles}`
  );
}

async function updateEpisodeExercises(client) {
  const updateResult = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .updateOne(
      { episode: "S30E13" },
      { $set: { title: "BLUE RIDGE FALLS" } }
    );

  console.log(
    `Ran a command to update episode 13 in season 30 and it updated ${updateResult.modifiedCount} episodes`
  );

  const updateBushesToBush = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .updateMany(
      { elements: "BUSHES" },
      { $set: { "elements.$": "BUSH" } }
    );

  console.log(
    `Ran a command to update all the BUSHES to BUSH and it updated ${updateBushesToBush.modifiedCount} episodes`
  );
}

async function deleteEpisodeExercise(client) {
  const deleteResult = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .deleteOne({ episode: "S31E14" });

  console.log(
    `Ran a command to delete episode and it deleted ${deleteResult.deletedCount} episodes`
  );
}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client);

    // READ
    await findEpisodesExercises(client);

    // UPDATE
    await updateEpisodeExercises(client);

    // DELETE
    await deleteEpisodeExercise(client);
  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    client.close();
  }
}

main();
