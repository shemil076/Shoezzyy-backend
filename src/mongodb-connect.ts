import { MongoClient, MongoClientOptions } from 'mongodb';

const uri = 'mongodb://localhost:27017/?maxPoolSize=20&writeConcern=majority';
const client = new MongoClient(uri, { useUnifiedTopology: true } as MongoClientOptions);

async function main() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const databaseName = 'ecommerce'; // Specify your database name here
    const database = client.db(databaseName);
    console.log(`Using database ${databaseName}`);

    // Perform operations on the database
    // For example, create a collection
    const collectionName = 'ecommerce'; // Specify your collection name here
    const collection = database.collection(collectionName);
    console.log(`Using collection ${collectionName}`);

    // Insert a document
    await collection.insertOne({ key: 'value' });
    console.log('Document inserted');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  } finally {
    // Close the connection
    await client.close();
    console.log('MongoDB connection closed');
  }
}

main();
