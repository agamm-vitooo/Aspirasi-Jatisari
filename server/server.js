const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { protect } = require('./middleware/auth');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const { register, login } = require('./controllers/authController');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize Express app
const app = express();

app.post('/api/auth/register', register); // Rute untuk registrasi
app.post('/api/auth/login', login); // Rute untuk login

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/api/auth', authRoutes); // Authentication routes (no protection)
app.use('/api/user', protect, userRoutes); // User routes (protected)

// Main route (root path)
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));