const User = require('../models/User')
const Note = require('../models/Note')

const Resolver = {
  Query: {
    Users: () => User.find(),
    User: async (_, {id}) => await User.findById(id),

    Notes: () => Note.find(),

  },

  Mutation: {
    addUser: async (_, args) => {
      return await new User(args).save()
    },
    addNote: async (_, args) => {
      return await new Note(args).save()
    }
  },

  User: {
    notes: (parent, args) => Note.find({userId: parent.id})
  },
  
  Notes: {
    user: (parent, args) => User.findById({_id: parent.userId})
  },

}

module.exports = Resolver