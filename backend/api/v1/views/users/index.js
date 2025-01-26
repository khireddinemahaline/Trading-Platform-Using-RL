const express = require('express');
const router = express.Router();
const { prisma } = require('../../app');

// ✅ Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// ✅ Get a single user by ID
router.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});

// ✅ Create a new user
router.post('/users', async (req, res) => {
  const { username, email, password, name } = req.body;

  // Log incoming request data to ensure it's coming as expected
  console.log('Request body:', req.body);

  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
        name,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user', details: error.message });
  }
});

// ✅ Update a user by ID
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, password, name } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { username, email, password, name },
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
});

// ✅ Delete a user by ID
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(204).send(); // No content response for successful deletion
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});

module.exports = router;
