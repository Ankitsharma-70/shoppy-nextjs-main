import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.DATABASE_URL;
const MONGODB_DB = "shoppynextjs";

// check the MongoDB URI
if (!MONGODB_URI) {
  throw new Error("Define the MONGODB_URI environmental variable");
}

// check the MongoDB DB
if (!MONGODB_DB) {
  throw new Error("Define the MONGODB_DB environmental variable");
}

let cachedClient: any = null;
let cachedDb: any = null;

export async function connectToDatabase() {
  // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  // set the connection options
  const opts: any = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // Connect to cluster
  const client = new MongoClient(MONGODB_URI!, opts);
  await client.connect();
  const db = client.db(MONGODB_DB);

  // set cache
  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}
