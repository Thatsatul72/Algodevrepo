const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./backend/config/config.js');
const problemRoutes = require('./backend/routes/problemRoutes');
const authRoutes = require('./backend/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api', problemRoutes); // Example path
app.use('/api/auth', authRoutes); // Example path


app.get("/", (req, res)=> {
  res.send("Hello, world!");
});
// Connect to MongoDB
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start the server
app.listen(9001, () => {
    console.log(`Server is running on port ${9001}`);
});
