
// need these imports for Apollo Server
import { ApolloServer, gql } from 'apollo-server'

// crypto is a built-in module in Node.js , we will be using it just for learning purposes
import crypto from 'crypto'



// to use apollo server, it's as simple as creating typeDefs, then resolvers, then create and listen on server



// for learning purposes, let's create a fake database that we call pull information from
const db = {
    users: [
        {
            id: '1',
            email: 'alex@gmail.com',
            name: 'Alex',
        },
        {
            id: '2',
            email: 'max@gmail.com',
            name: 'Max',
        },
        {
            id: '3',
            email: 'james@gmail.com',
            name: 'James',
        }
    ],
    messages: [
        { 
            id: '1',
            userId: '1',
            body: 'Hello',
            createdAt: Date.now(),
        },
        { 
            id: '2',
            userId: '2',
            body: 'Hi',
            createdAt: Date.now()
        },
        { 
            id: '3',
            userId: '1',
            body: 'Hey there',
            createdAt: Date.now()
        }
    ]
}



// to create a schema like we did before using just GraphQL, we do it this way
// this replaces buildSchema
const typeDefs = gql`
    type Query {
        users: [User!]!
        singleUser(id: ID!): User
        messages: [Message!]!
    }

    type Mutation {
        addUser(email: String!, name: String): User
    }

    type User {
        id: ID!
        email: String!
        name: String
        avatarUrl: String
        messages:  [Message!]!
    }

    type Message {
        id: ID!
        userId: String
        body: String!
        createdAt: String
    }
`



// this replaces rootValue
// this is where you specify what exactly the methods and queries with arugments do which you wrote in typeDefs
const resolvers = {
    // all the stuff to do with queries goes in here
    Query: {
        users: () => db.users,
        // for apollo server, instead of just args, we need root and args
        singleUser: (root, args) => db.users.find(user => user.id === args.id),
        messages: () => db.messages
    },
    // all the stuff to do with mutations goes in here
    Mutation: {
        addUser: (root, {email, name}) => {
            const user = {
                id: crypto.randomBytes(10).toString('hex'),
                email,
                name
            }
    
            db.users.push(user)
    
            return user
        }
    },
    // in express-graphql, it was very difficult to do nested types, the example here is that each user will have messages
    // in apollo server, you can create a nested type right here
    // make sure to add a messages: property in typeDefs above for the User type as well
    User: {
        // because this is under User, root will just be a single user object, if it were under Message, root would be a single message object
        messages: (root) => db.messages.filter(message => message.userId === root.id)
    }
}



// then we create an apollo server
const server = new ApolloServer({ typeDefs, resolvers })

// this will listen on the server
// by default the server will be on port 4000
// the endpoint will be /graphql
server.listen().then(data => console.log(data.url))



