const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const parkingRoutes = require("./routes/parkingRoutes"); // Import parking routes
const errorHandler = require('./middlewares/errorHandler');
const connectDb = require("./config/dbConnection"); 

dotenv.config();

const app = express();
const port = process.env.PORT || 5001; 
connectDb(); 

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/users', userRoutes); // User routes
app.use('/api/parking', parkingRoutes); // Parking routes

// Test routes
app.get('/', (req, res) => {
    res.send("API is working");
});

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
