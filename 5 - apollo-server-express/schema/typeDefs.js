
// need to import this to write gql statements
import { gql } from 'apollo-server-express'



// this is where you define the types, queries and mutations
// to actually write code for these, you do that in resolvers 
export const typeDefs = gql`
    type User {
        name: String!
        age: Int!
        married: Boolean!
    }

    type Query {
        getAllUsers: [User!]!
    }
`

