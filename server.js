// ==========================================
// ==========================================
// ==========================================

// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
var database = require("./db/db.json")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

//Allows express to link to the public folder
app.use(express.static(__dirname + "/public"));


// Setting up Express to handle data parsing
//Required for API calls
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//GET index file
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

//GET notes file
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });

// API routes
  app.get("/api/notes", function(req, res) {
    res.json(database);
  });

//POST to notes (USED from "Final Star Wars activity")
  app.post("/api/notes", function(req, res) {

    var newNote = req.body;
    var jsonFilePath = path.join(__dirname, "/db/db.json")

   
    let noteId = 100;

    //Loop through the array to find the highest ID
    for (let i = 0; i < database.length; i++){
      let singleNote = database[i];

      if (singleNote.id > noteId){
        noteId = singleNote.id;
      }
    }

    //Assinging an ID to the newNote
    newNote.id = noteId + 1;
    database.push(newNote)

    //Rewriting DB.json file
    fs.writeFile(jsonFilePath, JSON.stringify(database), function(err){
      if (err) {
        return console.log(err);
      }
      console.log("Your note was saved!");

    });

    //Gives back the users new notes
    res.json(newNote);

  });

  app.delete("/api/notes/:id", function(req, res) {
    var jsonFilePath = path.join(__dirname, "/db/db.json");

    for (let i = 0; i < database.length; i++){
      //Looping through to find the note to delete via ID
      if (database[i].id == req.params.id){
        //Splicing the note out of the array 
        database.splice(i, 1);
        break;
      }
    }

     //Rewriting DB.json file without the deleted note
    fs.writeFile(jsonFilePath, JSON.stringify(database), function(err){
      if(err){
        return console.log(err);
      } 
      console.log("Your note has been deleted.");
    });

    //Gives back the users new notes without the deleted note
    res.json(database);

  });


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
  