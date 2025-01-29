import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'tradingRL';
    this.url = `mongodb://${this.host}:${this.port}`;
    this.client = new MongoClient(this.url);
    this.db = null;
    this.connect();
  }

  // Connect to the MongoDB database
  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(this.database);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      process.exit(1); // Exit the process if the connection fails
    }
  }

  // Check if the database connection is alive
  async isAlive() {
    try {
      await this.client.db('admin').command({ ping: 1 });
      return true;
    } catch (error) {
      return false;
    }
  }

  // Count the number of documents in the 'users' collection
  async nbUsers() {
    try {
      const count = await this.db.collection('users').countDocuments();
      return count;
    } catch (error) {
      console.error('Error counting users:', error);
      throw error; // Rethrow the error for the caller to handle
    }
  }

  // Count the number of documents in the 'files' collection
  async nbFiles() {
    try {
      const count = await this.db.collection('files').countDocuments();
      return count;
    } catch (error) {
      console.error('Error counting files:', error);
      throw error; // Rethrow the error for the caller to handle
    }
  }

  // Close the database connection
  async close() {
    try {
      await this.client.close();
      console.log('MongoDB connection closed');
    } catch (error) {
      console.error('Error closing MongoDB connection:', error);
    }
  }
}

// Create a singleton instance of DBClient
const dbClient = new DBClient();

// Handle process termination to close the database connection
process.on('SIGINT', async () => {
  await dbClient.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await dbClient.close();
  process.exit(0);
});

export default dbClient;