import sha1 from 'sha1';
import Queue from 'bull';
import dbClient from '../utils/db.js';
import bcrypt from 'bcrypt';

// Initialize the queue for email sending
const userQueue = new Queue('email sending');

class UsersController {
  // Create a new user
  static async postNew(req, res) {
    const { email, password, username, name } = req.body;

    // Validate input
    if (!email) return res.status(400).json({ error: 'Missing email' });
    if (!password) return res.status(400).json({ error: 'Missing password' });
    if (!username) return res.status(400).json({ error: 'Missing username' });

    try {
      // Check if user already exists
      const userExists = await dbClient.db.collection('users').findOne({ email });
      if (userExists) return res.status(400).json({ error: 'User already exists' });

      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the new user
      const newUser = await dbClient.db.collection('users').insertOne({
        email,
        password: hashedPassword,
        username,
        name: name || null, // Optional field
      });

      if (!newUser) return res.status(500).json({ error: 'Could not create user' });

      // Add a job to the queue for email sending
      userQueue.add({ userId: newUser.insertedId, email });

      // Return the new user's details (excluding the password)
      return res.status(201).json({
        id: newUser.insertedId,
        email,
        username,
        name: name || null,
      });
    } catch (error) {
      console.error('Error in postNew:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Get the current user's details
  static async getMe(req, res) {
    if (!req.user) return res.status(401).json({ error: 'Unauthorized' });

    try {
      const user = await dbClient.db.collection('users').findOne({ _id: req.user.id });
      if (!user) return res.status(404).json({ error: 'User not found' });

      return res.status(200).json({
        id: user._id,
        email: user.email,
        username: user.username,
        name: user.name || null,
      });
    } catch (error) {
      console.error('Error in getMe:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default UsersController;
