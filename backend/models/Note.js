const mongoose = require('mongoose');
const { Schema } = mongoose;

//When you create a model 
// if your model name is Notes, Mongoose will look for a collection named notes in the database.

const NotesSchema = new mongoose.Schema({
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'user'
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      default:"General"
    },
  }, {
    timestamps: true,
  });
  
  const Notes = mongoose.model('notes', NotesSchema);
  module.exports = Notes;
  