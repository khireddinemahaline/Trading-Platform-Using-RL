import redisClient from '../utils/redis.js';
import dbClient from '../utils/db.js';

/**
 * Controller for the index API
 * @class AppController
 * @method getStatus
 * @method getStats
 */
class AppController {
  /**
   * Get the status of Redis and MongoDB
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   */
  static async getStatus(req, res) {
    try {
        const redisAlive = await redisClient.isAlive(); // await the promise
        const dbAlive = await dbClient.isAlive();
      console.log('Redis alive:', redisAlive); // Log Redis status
      console.log('DB alive:', dbAlive); // Log DB status
      res.status(200).json({ redis: redisAlive, db: dbAlive });
    } catch (error) {
      console.error('Error in getStatus:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  /**
   * Get the number of users and files in the database
   * @param {Object} req - The request object
   * @param {Object} res - The response object
   */
  static async getStats(req, res) {
    try {
      const [usersCount, filesCount] = await Promise.all([
        dbClient.nbUsers(),
        dbClient.nbFiles(),
      ]);
      res.status(200).json({ users: usersCount, files: filesCount });
    } catch (error) {
      console.error('Error in getStats:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default AppController;