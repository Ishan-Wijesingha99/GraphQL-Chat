
// import everything needed to use graphql and express together
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

// crypto is a built-in module in Node.js , we will be using it just for learning purposes
import crypto from 'crypto'



// start express app
const app = express()



// for learning purposes, let's create a fake database that we call pull information from
const db = {
    users: [
        {
            id: '1',
            email: 'alex@gmail.com',
            name: 'Alex'
        },
        {
            id: '2',
            email: 'max@gmail.com',
            name: 'Max'
        },
        {
            id: '3',
            email: 'james@gmail.com',
            name: 'James'
        }
    ],
    messages: [
        { 
            id: '1',
            userId: '1',
            body: 'Hello',
            createdAt: Date.now()
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



// set up schema for graphQL

// we can add a type called Mutation, in this we create methods
// we have created an addUser() method which takes an email and a name as arguments. The email is required and the name is not required
// and we specify that a User will be returned by this method

// we can also have queries that accept arguments
// for singleUser, there needs to be argument passed in which is the id
// we have also specified that this query will return a user
const schema = buildSchema(`
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
    }

    type Message {
        id: ID!
        userId: String
        body: String!
        createdAt: String
    }
`)

// set up rootValue
// whatever you write in the schema, you'll have to specify here
const rootValue = {
    users: () => db.users,
    // in order to implement the singleUser query, we must add it here
    singleUser: args => db.users.find(user => user.id === args.id),
    // in order to implement the addUser function specified in the schema, we must add it down here
    addUser: ({email, name}) => {
        // create a user object based on what has been passed into the function
        const user = {
            // we will use the crypto library to come up with a unique identifier
            id: crypto.randomBytes(10).toString('hex'),
            email,
            name
        }

        // to simulate adding something to the database, we are pushing this new user to the array
        db.users.push(user)

        // return user to see new user that has been pushed into array
        return user
    },
    // in order to implement the messages query, we must add it here
    messages: () => db.messages
}



// you need this middleware to use graphql with express
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
}))



// listen on port 3000
app.listen(3000, () => console.log('Server listening on port 3000...'))



// GraphiQL stuff

// you can run queries in the GraphiQL interface



// if you run this, which is asking to retrieve the emails in users...

// query {
//     users {
//       email
//     }
// }

// you will get this, a JSON object that returns the emails...
// {
//     "data": {
//       "users": [
//         {
//           "email": "alex@gmail.com"
//         },
//         {
//           "email": "max@gmail.com"
//         },
//         {
//           "email": "james@gmail.com"
//         }
//       ]
//     }
// }

// will always have a "data" field in the JSON response



// if you run this mutation, which is basically running the addUser function...

// mutation {
//     addUser(email: "tom@gmail.com", name: "Tom") {
//       id
//       email
//       name
//     }
// }

// you will get this...
// {
//   "data": {
//     "addUser": {
//       "id": "2d8ebac354cba279dc3b",
//       "email": "tom@gmail.com",
//       "name": "Tom"
//     }
//   }
// }



// if you run this query which takes an argument as well...
// query {
//     singleUser(id: "3") {
//       email
//       name
//     }
// }

// you will get this back...
// {
//     "data": {
//       "singleUser": {
//         "email": "james@gmail.com",
//         "name": "James"
//       }
//     }
// }