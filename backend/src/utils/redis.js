import { createClient } from '@redis/client';

class RedisClient {
  constructor() {
    this.client = createClient({
      url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`,
    });

    this.client.on('error', (error) => {
      console.error(`Redis client not connected to the server: ${error.message}`);
    });

    this.client.on('connect', () => {
      console.log('Redis client connected to the server');
    });

    // Initialize the client connection
    this.client.connect().catch((err) => {
      console.error(`Error connecting to Redis: ${err.message}`);
    });
  }

  // Check if Redis is alive using the ping command
  async isAlive() {
    try {
      // Ensure client is connected before performing any commands
      if (this.client.isOpen) {
        const response = await this.client.ping();
        return response === 'PONG'; // If we get 'PONG', Redis is alive
      } else {
        console.error('Redis client is not open.');
        return false;
      }
    } catch (error) {
      console.error('Error in checking Redis status:', error);
      return false;
    }
  }

  async set(key, value, duration) {
    try {
      await this.client.setEx(key, duration, value);
      return 'OK';
    } catch (err) {
      console.error(`Error setting key ${key}: ${err.message}`);
      throw err;
    }
  }

  async del(key) {
    try {
      const result = await this.client.del(key);
      return result;
    } catch (err) {
      console.error(`Error deleting key ${key}: ${err.message}`);
      throw err;
    }
  }

  // Close the client when no longer needed
  close() {
    if (this.client.isOpen) {
      this.client.quit();
    }
  }
}



const redisClient = new RedisClient();
export default redisClient;