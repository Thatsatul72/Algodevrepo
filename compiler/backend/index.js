const express = require("express");
const cors = require("cors");
const {generateFile} = require("./generateFile.js");
const { executeCpp } = require("./executeCpp");
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
   
    res.json({ online: "compiler" });
});

app.post("/run", async (req, res) => {
    const { language = 'cpp', code } = req.body;
    if (code === undefined) {
        return res.status(404).json({ success: false, error: "Empty code!" });
    }
    
    try {
        const filePath = await generateFile(language, code);
        const output = await executeCpp(filePath);
        res.send({ filePath, output});
    } catch (error) {
        res.status(500).json({ success: false, message:"Error: " + error.message });
    }
});

app.listen(5000, () => {
    console.log("Server is listening on port 5000!");
});
