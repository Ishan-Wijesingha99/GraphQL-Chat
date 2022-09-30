
// you need to run npm install graphql and then import these
import { graphql, buildSchema } from 'graphql'

// GraphQL is a querying language that allows to you retrieve only the bits of information you want from a database. One problem with querying langauges is that it over-fetches or under-fetches data, this impedes performance, GraphQL solves this

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
    ]
}





// GraphQL uses types, and the root type is always Query
// we are telling GraphQL that there is a message field/property, and when we query that field we will get back a string
// in this case, the Query type has a users property which points to the User type
// the id has '!ID' which is a string that uniquely identifies, in this case, we are making sure each user has a unique id
// the '!' at the end shows that this property is REQUIRED for every User
// for users, we are expecting an array of many users, not just a single user, so for that we need to surround 'User' with []
// We also want to make sure that something is always return in the list, we don't want any list item in the list to be null, so we will replace 'User' with 'User!'
// furthermore, we want to make sure that the entire list returned back to us isn't null, so we will add an exclammation mark to the entire array as well '[User!]!'
const schema = buildSchema(`
    type Query {
        users: [User!]!
    }

    type User {
        id: ID!
        email: String!
        name: String
        avatarUrl: String
    }
`)

// here we create an object that has properties that coincide to the schema above
// the values in these key-value pairs are the values that will actually be returned when we query using GraphQL
const rootValue = {
    users: () => db.users
}

// to put it all together you must do this
// in this case, we are telling GraphQl to only return the email field
graphql(
    schema,
    `
        {
            users {
                email
            }
        }
    `,
    rootValue
)
.then(data => console.dir(data, { depth: null }))
.catch(err => console.log(err))