const { app } = require('./app');
const users = require('./views/users/index');
const test = require('./views/test/index');

// Routes
app.use('/api/v1', users);
app.use('/api/v1', test);

// 404 Handler
app.use((req, res, next) => {
  console.log('404 - Not Found');
  res.status(404).json({ message: 'Not Found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});