const User = require('../models/User')
const Note = require('../models/Note')
const bcrypt = require('bcrypt-nodejs')

const Resolver = {
  Query: {
    Users: () => User.find(),
    User: async (_, { id }) => await User.findById(id),
    Note: async (_, { id }) => await Note.findById(id),
    Notes: () => Note.find(),
  },

  Mutation: {
    addUser: async (_, args) => {
      const salt = bcrypt.genSaltSync()
      args.password = bcrypt.hashSync(args.senha, salt)
      return await new User(args).save()
    },
    editUser: (_, args) => {
      if (args.email) return User.findOneAndUpdate({ email: args.email }, args)
      if (args.id) return User.findOneAndUpdate({ _id: args.id }, args)
      if (!args.email || !args.id) return new Error('You need to inform either an ID or an Email in order to edit a user.')
    },
    deleteUser: async (_, { id, email }) => {
      if (id) return await User.findByIdAndDelete({ _id: id })
      if (email) return await User.findOneAndDelete({ email: email })
      if (!id || !email) return Error('You need to inform either an ID or an Email in order to delete a user')
    },
    addNote: async (_, args) => {
      if (args) return await new Note(args).save()
      if (!args.title) return Error('Please, inform a title for your note')
      if (!args.note) return Error('Please, inform the note for your note')
      if (!args.userId) return Error('Please inform the user')
    },
    editNote: (_, args) => {
      if (args.id) return Note.findOneAndUpdate({ _id: args.id }, args)
      return new Error('You need to inform an ID in order to edit a note')
    },
    deleteNote: (_, { id }) => {
      if (id) return Note.findByIdAndDelete({ _id: id })
      return new Error('You need to inform an ID in order to delete a note')
    }
  },

  User: {
    notes: (parent, args) => Note.find({ userId: parent.id })
  },

  Notes: {
    user: (parent, args) => User.findById({ _id: parent.userId })
  },

}

module.exports = Resolver