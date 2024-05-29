const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");

// ROUTE 1 : Fetch all notes : GET '/api/notes/fetchallnotes' . Login required

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  console.log("hi")
  try {
    // here Notes is the name of db from where we are fetchinf notes by id
    console.log(req)
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("some error occured");
  }
});

// ROUTE 2 : add a new note: POST '/api/notes/addnote' . Login required

router.post(
  "/addnote",
  fetchuser,
  [
    check("title").isLength({ min: 3 }).withMessage("Enter a valid title"),
    check("description")
      .isLength({ min: 5 })
      .withMessage("Description is 5 atleast characters long"),
  ],
  async (req, res) => {
    try {
      // Using destructuring
      const { title, description, tag } = req.body;
      //if there are errors return bad requests with error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //new Note({ ... }) creates a new document in the notes collection(table)
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("some error occured");
    }
  }
);

// ROUTE 3 : add a new note: PUT '/api/notes/updatenote' . Login required

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try{
  //create a new note object
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  // find the note to be updated and update it
  // here we get the id from get request
  // req.params.id is used to get the ID from the request URL
  let note = await Note.findById(req.params.id);
  if(!note){return res.status(404).send("Not found")};
  // .toString function is used to convert db object in string
  if(note.user.toString() !== req.user.id){
        return res.status(401),send("not allowed");
  }

  note = await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
  res.json({note});
  }catch{
        console.log(error.message);
      res.status(500).send("some error occured");
  }

});

// ROUTE 4 : delete a new note: DELETE '/api/notes/deletenote' . Login required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
       try {
        // find the note to be deleted and delete it
        // here we get the id from get request
        // req.params.id is used to get the ID from the request URL
        let note = await Note.findById(req.params.id);
        if(!note){return res.status(404).send("Not found")};
        // .toString function is used to convert db object in string
        //allow deleteion if only user owns this note    
        if(note.user.toString() !== req.user.id){
              return res.status(401),send("not allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({success:"Note has been deleted"});
     } catch (error) {
        console.log(error.message);
      res.status(500).send("some error occured")
   }
});

module.exports = router;

