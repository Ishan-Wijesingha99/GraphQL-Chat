
// the apollo-server npm package automatically uses express in the background, it abstracts it away from developers

// for apollo-server-express, you do it more explicitly

// need to import this for apollo-server-express
import { ApolloServer } from 'apollo-server-express'

// need to import express 
import express from  'express'

// need to import typeDefs and resolvers
import { typeDefs } from './schema/typeDefs.js'
import { resolvers } from './schema/resolvers.js'

// create express app
const app = express()

// create apollo server with typeDefs and resolvers 
const server = new ApolloServer({ typeDefs, resolvers })

// apply the apollo middleware
server.applyMiddleware({ app })

// listen on port 3000
app.listen(3001, () => console.log('Server is listening on port 3001'))