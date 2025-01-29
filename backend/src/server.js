import express from 'express';
import initialization from './routes/index.js';

const app = express();
const port = process.env.PORT || 5000;

// Express JSON middleware to parse incoming requests with large bodies
app.use(express.json({ limit: '200mb' }));

// Initialize routes
initialization(app);

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
