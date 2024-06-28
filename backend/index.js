const express = require('express');
const cors = require('cors'); // Import cors module
const app = express();
const { DBConnection } = require('./database/db.js');
const User = require('./models/Users.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv= require('dotenv')
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

DBConnection();

app.get("/", (req, res)=> {
    res.send("Hello, world!");
});

app.post("/register", async (req, res)=> {
    try {
        //get all the data from body
        const { firstname, lastname, email, password } = req.body;

        // check that all the data should exists
        if (!(firstname && lastname && email && password)) {
            return res.status(400).send("Please enter all the information");
        }

        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).send("User already exists!");
        }

        // encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // save the user in DB
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        });

        // generate a token for user and send it
        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
            expiresIn: "1d"
        });
        user.token = token;
        user.password = undefined;
        res.status(200).json({ 
            message: "You have successfully registered!", user });
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred during registration");
    }
});

app.post("/login", async (req, res) => {
    try {
        // Get email and password from request body
        const { email, password } = req.body;

        // Check that both email and password are provided
        if (!(email && password)) {
            return res.status(400).send("Please enter both email and password");
        }

        // Check if user exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("User not registered. Please register first.");
        }

        // Check if the provided password matches the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send("Invalid email or password");
        }

        // Generate a token for the user
        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
            expiresIn: "1d"
        });

        // Send the token to the client
        res.status(200).json({ 
            message: "Login successful", 
            token 
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred during login");
    }
});

app.listen(8000, ()=> {
    console.log("Server listening on port 8000");
});
