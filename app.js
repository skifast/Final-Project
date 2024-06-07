"use strict"

//Load required modules
const express = require("express");
const app = express();
const fs = require("fs/promises");

app.use(express.static("public"));
const DEBUG = true; 

const multer = require("multer");
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(multer().none());


app.get("/costumes/:categories/:costumeid", async (req, res) => {
    let fileNames = [];
    try {
        // read the directory, getting the filenames
        fileNames = await fs.readdir('data', 'utf8');
    } catch (err) {
        console.error(err + "\nFailed to read directory");
        res.status(500).send("Failed to read directory");
        return;
    }
    let result = [];
    for(let i = 0; i < fileNames.length; i++){
        try{
            // read the file, getting the data
            const data = await fs.readFile('data/' + fileNames[i], 'utf8');
            const costume = JSON.parse(data);
            if(costume.id === req.params.costumeid){
                result.push(costume);
            } 
        } catch (err){
            if(DEBUG){
                console.error(err + "\nFailed to read file");
                continue;
            }
            //.send won't stop the program, be sure not to send things twice
            res.status(500).send("Failed to read file");
            return;
        } 
    }
    res.json(result);
});

app.get("/costumes/:categories", async (req, res) => {
    let fileNames = [];
    try {
        fileNames = await fs.readdir('data', 'utf8');
    } catch (err) {
        console.error(err + "\nFailed to read directory");
        res.status(500).send("Failed to read directory");
        return;
    }
    let result = [];
    for(let i = 0; i < fileNames.length; i++){
        try{
            // read the file, getting the data
            const data = await fs.readFile('data/' + fileNames[i], 'utf8');
            const costume = JSON.parse(data);
            if(costume.categories.includes(req.params.categories)){
                result.push(costume);
            } 
        } catch (err){
            if(DEBUG){
                console.error(err + "\nFailed to read file");
                continue;
            }
            //.send won't stop the program, be sure not to send things twice
            res.status(500).send("Failed to read file");
            return;
        } 
    }
    res.json(result);
});

// Returns a list of json objects
app.get("/costumes", async (req, res) => {
    let fileNames = [];
    try {
        //get the filename from the list of filenames
        fileNames = await fs.readdir('data', 'utf8');
    } catch (err) {
        console.error(err + "\nFailed to read directory");
        res.status(500).send("Failed to read directory");
        return;
    }
    let result = [];
    for(let i = 0; i < fileNames.length; i++){
        try{
            //read the file, getting the data
            const data = await fs.readFile('data/' + fileNames[i], 'utf8');
            result.push(JSON.parse(data)); 
        } catch (err){
            if(DEBUG){
                console.error(err + "\nFailed to read file");
            }
            //.send won't stop the program, be sure not to send things twice
            res.status(500).send("Failed to read file");
            return;
        } 
    }
    res.json(result);
});

app.post("/feedback", (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let feedback = req.body.feedback;
    let timestamp = new Date().toISOString();
 
    if (!name || !email || !feedback) {
       return res.status(400).json({ error: 'All fields are required' });
    }
 
    const info = {
       name,
       email,
       feedback,
       timestamp
    };
 
    fs.appendFile('message.json', JSON.stringify(info) + '\n', (err) => {
       if (err) {
          return res.status(500).json({ error: 'Could not save feedback' });
       }
       res.status(200).json({ message: 'Feedback received' });
    });

    res.send('Request successful.');
 });

// Start the app on an open port
const PORT = process.env.PORT || 8003;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});