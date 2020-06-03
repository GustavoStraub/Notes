const User = require('../models/User')


const Resolver = {
  Query: {
    Users: () => User.find()
  },

  Mutation: {
    addUser: async (_, args) => {
      return await new User(args).save()
    },
  }

 
}

module.exports = Resolver