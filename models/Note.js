const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NoteSchema = new Schema({
  title: String,
  note: String,
  userId: String
})

module.exports = mongoose.model('Note', NoteSchema)