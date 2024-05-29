import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";


const AddNote = (props) => {
    //useContext hook is used  to access context values
  const context = useContext(noteContext);
  // Through destructuring we take the function to work accordingly
  const { addNote } = context;

  // this satate is for only this component
  const [note,setNote] = useState({title:"" , description:"" , tag:""})

  // e: This is the event object that gets passed to the function when an event occurs. In this case, it is likely a change event from an input field.
  const handleClick = (e)=>{
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title:"" , description:"" , tag:""})
    props.showAlert("Added successfully","success")
  }

  const onChange=(e)=>{
    // spread operator
    // the values in the note state are same but the succeeded properties are overwrite or add    
    setNote({...note, [e.target.name]:e.target.value ,});
  }

  return (
    <div>
      <div className="conatiner my-3">
        <h2>Add a note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              value={note.title} 
              minLength={4}
              required
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              value={note.description} 
              minLength={4}
              required
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              value={note.tag} 
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onChange}
            />
          </div>
          <button disabled={note.title.length<4 || note.description.length<4} type="submit" className="btn btn-primary" onClick={handleClick}>
            Add Note
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
