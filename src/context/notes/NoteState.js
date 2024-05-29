import { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

// Get all notes
const getNotes = async () => {
console.log("from get notes")
console.log(localStorage.getItem('token'));
  try {
    const response = await fetch(`http://localhost:5000/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authToken":localStorage.getItem('token')
        // Add more headers as needed
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch notes');
    }

    const json = await response.json();
    console.log(json);
    setNotes(json);
  } catch (error) {
    console.error('Error fetching notes:', error);
  }
};



  // Add a note
  const addNote = async (title, description, tag) => {

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authToken":localStorage.getItem('token')
        // Add more headers as needed
      },
      body: JSON.stringify({title,description,tag}),
    });

    const note = await response.json(); // Assuming response is JSON
    // Concate return a new array
    setNotes(notes.concat(note));
  };

  // Delete a note
  const deleteNote = async (id) => {
    // api call todo
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authToken":localStorage.getItem('token')
        // Add more headers as needed
      },
    });

    const json = response.json();
    console.log(json)
    //logic for deleting in client side 
    console.log("deleting note with id " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authToken":localStorage.getItem('token')
        // Add more headers as needed
      },
      body: JSON.stringify({title,description,tag}),
    });

    const json = await response.json(); // Assuming response is JSON
    console.log(json)
    // Logic to edit in cleint side
    let newNotes = JSON.parse(JSON.stringify(notes)) 

    for (let index = 0; index < newNotes.length; index++) {
      // The loop iterates over each note in the notes array(collection in db) to find the one with the specified _id. Once it finds the note with the matching _id, it updates its properties.
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes)
  };

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote ,getNotes}}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
