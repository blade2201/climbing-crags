import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

// In development mode, use a global variable so that the value
// is preserved across module reloads caused by HMR (Hot Module Replacement).
if (!global._mongoClientPromise) {
  client = new MongoClient(uri!, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;
// In production mode, it's best to not use a global variable.

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;
