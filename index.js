const {ApolloServer} = require('apollo-server')
const mongoose = require('mongoose')
const chalk = require('chalk')
const typeDefs = require('./schema/schema.js')
const resolvers = require('./resolvers/resolvers.js')
require('dotenv').config()


mongoose.connect(
  process.env.CONNECTION + '',
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
)

mongoose.connection.once('open', () => {
  console.log(chalk.magenta('> MongoDb Connected\n'))
})

const server = new ApolloServer({typeDefs, resolvers})
server.listen(process.env.PORT || 4001).then(({url}) => {
  console.log(chalk.cyan(`> Apollo Server ready at ${url}`))
})

