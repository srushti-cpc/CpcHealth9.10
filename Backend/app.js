require('dotenv').config();  // Loads environment variables from .env
const express = require('express');
const connectDB = require('./config/db');  // Import the MongoDB connection
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;
// app.use(cors({
//   origin: ['http://localhost:3000', 'http://localhost:3001','https://1de1-2402-a00-162-8d33-18dc-a329-fe6d-2d69.ngrok-free.app'] ,
//   credentials: true, // Allow cookies to be sent with requests
//   optionsSuccessStatus: 200 // Some legacy browsers choke on 204
// }));

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/insurance', require('./routes/insuranceRoutes'));
app.use('/api/language', require('./routes/languageRoutes'));
app.use('/api/speciality', require('./routes/specialityRoutes'));
app.use('/api/practice', require('./routes/PracticeRoutes'));
app.use('/api/provider', require('./routes/providerRoutes'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
