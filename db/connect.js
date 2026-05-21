const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URL);

let db;

const initDb = async (callback) => {
  try {
    if (db) {
      console.log('Database already initialized');
      return callback(null, db);
    }

    await client.connect();
    db = client.db('cse341');

    console.log('Connected to MongoDB');
    callback(null, db);
  } catch (err) {
    callback(err);
  }
};

const getDb = () => {
  if (!db) {
    throw Error('Database not initialized');
  }
  return db;
};

module.exports = {
  initDb,
  getDb
};