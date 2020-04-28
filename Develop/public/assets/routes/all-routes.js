
// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//*GET notes file
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
  });


//GET * "index file"
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

// API routes
  app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
  });
//POST to notes (USED from "Final Star Wars activity")
  app.post("/api/notes", function(req, res) {

    var newNote = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newNote.routeName = newNote.name.replace(/\s+/g, "");
  
    console.log(newNote);
  
    characters.push(newNote);
  
    res.json(newNote);
  });

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
  });

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
  });

module.exports = route