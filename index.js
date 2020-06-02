const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const chalk = require('chalk')
const { importSchema } = require('graphql-import')
const resolvers = require('./resolvers')

const typeDefs = require('./schemas')

mongoose.connect(
  'mongodb+srv://gustavo:<password>@notes-scpfh.gcp.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
)

mongoose.connection.once('open', () => {
  console.log(chalk.greenBright('> MongoDb Connected\n'))
})

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // context
})
server.listen(4001).then(({url}) => {
  console.log(chalk.cyan(`> Apollo Server ready at ${url}`))
})