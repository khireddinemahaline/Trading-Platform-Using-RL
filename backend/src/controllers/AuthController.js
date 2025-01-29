import { v4 as uuidv4 } from 'uuid';
import RedisClient from '../utils/redis.js';
import dbClient from '../utils/db.js';
import bcrypt from 'bcrypt';

class AuthController {
  // Connect user and generate a token
  static async getConnect(req, res) {
    try {
      const { email, password } = req.body;

      // Validate input
      if (!email || !password) {
        return res.status(400).json({ error: 'Missing email or password' });
      }

      // Find the user in the database
      const user = await dbClient.db.collection('users').findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Verify the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Generate a unique token
      const token = uuidv4();

      // Store the token in Redis with a 24-hour expiration
      const key = `auth_${token}`;
      const userId = user._id.toString(); // Ensure userId is a string
      const expiration = 24 * 60 * 60; // 24 hours in seconds

      // Use Redis setex correctly
      await RedisClient.set(key, userId, expiration);  // Passing duration as seconds

      // Return the token to the client
      return res.status(200).json({ token });
    } catch (error) {
      console.error('Error in getConnect:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Disconnect user and delete the token
  static async getDisconnect(req, res) {
    try {
      const token = req.headers['x-token'];
  
      // Validate token
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      // Define the key for the token in Redis
      const key = `auth_${token}`;
  
      // Delete the token from Redis
      const deleted = await RedisClient.del(key);  // Returns the number of deleted keys
  
      // If the key was not found and deleted, return Unauthorized
      if (deleted === 0) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
  
      // Return a 204 No Content response if the deletion was successful
      return res.status(204).send();
    } catch (error) {
      console.error('Error in getDisconnect:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default AuthController;
