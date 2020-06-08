const User = require('../models/User')
const Note = require('../models/Note')
const bcrypt = require('bcrypt-nodejs')
const { GetUserLogged } = require('../config/Token')

const Resolver = {
  Query: {
    Login: async (_, { email, password }) => {
      const user = await User.findOne({ email: email })
      if (!user) {
        throw new Error('User not found!')
      }
      const salt = bcrypt.genSaltSync()

      const PasswordComparing = bcrypt.compareSync(password, user.password)

      if (!PasswordComparing) {
        throw new Error('Wrong Password!')
      }
      return GetUserLogged(user)
    },
    Users: () => User.find(),
    User: async (_, { id }) => await User.findById(id),
    Note: async (_, { id }) => await Note.findById(id),
    Notes: () => Note.find(),
  },
  Mutation: {
    addUser: async (_, args) => {
      const salt = bcrypt.genSaltSync()
      args.password = bcrypt.hashSync(args.password, salt)
      const Email = await User.findOne({email : args.email})
      console.log(Email)
      if(Email == null){
        return await new User(args).save()
      } else {
        return new Error('Email is already assigned')
      }
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
    deleteNote: async (_, { id }) => {
      if (id) return await Note.findByIdAndDelete({ _id: id })
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