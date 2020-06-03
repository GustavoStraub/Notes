const {ApolloServer} = require('apollo-server')
const mongoose = require('mongoose')
const chalk = require('chalk')
const typeDefs = require('./schema/schema.js')
const resolvers = require('./resolvers/resolvers.js')


mongoose.connect(
  'mongodb+srv://gustavo:123@notes-scpfh.gcp.mongodb.net/Notes?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
)

mongoose.connection.once('open', () => {
  console.log(chalk.magenta('> MongoDb Connected\n'))
})

const server = new ApolloServer({typeDefs, resolvers})
server.listen(4001).then(({url}) => {
  console.log(chalk.cyan(`> Apollo Server ready at ${url}`))
})

